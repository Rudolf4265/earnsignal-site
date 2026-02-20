import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  source: z.enum(["upload", "cta"]),
});

type Entry = { count: number; resetAt: number };

const WINDOW_MS = 60_000;
const LIMIT = 10;

const rateStore = globalThis as typeof globalThis & { __notifyRateLimit?: Map<string, Entry> };
const buckets = rateStore.__notifyRateLimit ?? new Map<string, Entry>();
rateStore.__notifyRateLimit = buckets;

function ipFromRequest(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = buckets.get(ip);

  if (!current || current.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (current.count >= LIMIT) {
    return true;
  }

  current.count += 1;
  return false;
}

async function sendNotification(email: string, source: "upload" | "cta") {
  const to = process.env.POSTMARK_TO_EMAIL;
  const from = process.env.POSTMARK_FROM_EMAIL;
  const token = process.env.POSTMARK_SERVER_TOKEN;
  const timestamp = new Date().toISOString();

  if (!to || !from || !token) {
    console.log("[notify fallback]", { email, source, timestamp });
    return;
  }

  const textBody = [`EarnSignal interest`, `Email: ${email}`, `Source: ${source}`, `Timestamp: ${timestamp}`].join("\n");

  const response = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": token,
    },
    body: JSON.stringify({
      From: from,
      To: to,
      Subject: "EarnSignal interest",
      TextBody: textBody,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Postmark failed with ${response.status}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(ipFromRequest(request))) {
      return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
    }

    await sendNotification(parsed.data.email, parsed.data.source);
    return NextResponse.json({ ok: true }, { status: 202 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: "Unexpected error" }, { status: 500 });
  }
}
