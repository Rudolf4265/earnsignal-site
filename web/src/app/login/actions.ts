"use server";

import { redirect } from "next/navigation";
import { clearSessionCookies, sendMagicLink, setSessionCookies, signInWithPassword } from "@/lib/supabase";

export async function loginWithPasswordAction(_prev: string | null, formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!email || !password) {
    return "Enter both email and password.";
  }

  try {
    const session = await signInWithPassword(email, password);
    await setSessionCookies(session);
  } catch {
    return "Login failed. Check your credentials and try again.";
  }

  redirect("/app");
}

export async function sendMagicLinkAction(_prev: string | null, formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  if (!email) return "Enter your email first.";

  try {
    await sendMagicLink(email);
    return "Magic link sent. Check your inbox.";
  } catch {
    return "Unable to send magic link right now.";
  }
}

export async function logoutAction() {
  await clearSessionCookies();
  redirect("/login");
}
