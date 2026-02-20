"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const schema = z.object({ email: z.string().email("Please enter a valid email.") });

export function UploadInterestForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = schema.safeParse({ email });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid email.");
      return;
    }

    setSubmitting(true);
    setError("");

    const response = await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: parsed.data.email, source: "upload" }),
    });

    setSubmitting(false);

    if (!response.ok) {
      setError("Could not submit right now. Please try again shortly.");
      return;
    }

    router.push("/submitted");
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 max-w-md space-y-3" noValidate>
      <label htmlFor="email" className="block text-sm font-medium">
        Email for handoff updates
      </label>
      <input
        id="email"
        type="email"
        autoComplete="email"
        className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Continue"}
      </Button>
      <p className="text-xs text-muted">No spam. Transactional updates only.</p>
    </form>
  );
}
