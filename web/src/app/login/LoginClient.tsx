"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithOtp, signInWithPassword } from "./actions";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

const initialState = null as string | null;

export default function LoginClient() {
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [passwordMessage, passwordAction, passwordPending] = useActionState(signInWithPassword, initialState);
  const [magicMessage, magicAction, magicPending] = useActionState(signInWithOtp, initialState);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let mounted = true;
    async function checkSession() {
      try {
        const supabase = createBrowserSupabaseClient();
        const { data } = await supabase.auth.getUser();
        if (mounted && data.user) {
          router.replace("/app");
        }
      } catch {
        // noop
      }
    }
    checkSession();
    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">EarnSignal</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">Sign in to your briefing workspace</h1>
        <p className="mt-2 text-sm text-slate-600">Secure login for your financial dashboard and reports.</p>
        {searchParams.get("error") ? (
          <p className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">Authentication callback failed. Please try again.</p>
        ) : null}

        <div className="mt-5 grid grid-cols-2 rounded-lg border border-slate-200 bg-slate-50 p-1 text-sm">
          <button type="button" onClick={() => setMode("password")} className={`rounded-md py-2 font-medium ${mode === "password" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>Password</button>
          <button type="button" onClick={() => setMode("magic")} className={`rounded-md py-2 font-medium ${mode === "magic" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>Magic Link</button>
        </div>

        {mode === "password" ? (
          <form action={passwordAction} className="mt-5 grid gap-3">
            <input name="email" type="email" required placeholder="you@example.com" className="h-11 rounded-lg border border-slate-300 px-3 text-sm" />
            <input name="password" type="password" required placeholder="Password" className="h-11 rounded-lg border border-slate-300 px-3 text-sm" />
            {passwordMessage ? <p className="text-sm text-rose-700">{passwordMessage}</p> : null}
            <button disabled={passwordPending} className="h-11 rounded-lg bg-teal-600 text-sm font-semibold text-white disabled:opacity-60">{passwordPending ? "Signing in..." : "Sign in"}</button>
          </form>
        ) : (
          <form action={magicAction} className="mt-5 grid gap-3">
            <input name="email" type="email" required placeholder="you@example.com" className="h-11 rounded-lg border border-slate-300 px-3 text-sm" />
            {magicMessage ? <p className="text-sm text-slate-700">{magicMessage}</p> : null}
            <button disabled={magicPending} className="h-11 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 disabled:opacity-60">{magicPending ? "Sending..." : "Send magic link"}</button>
          </form>
        )}

        <p className="mt-5 text-xs text-slate-500">By continuing, you agree to our <Link href="/terms" className="text-slate-700 underline">terms</Link>.</p>
      </section>
    </main>
  );
}
