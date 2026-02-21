"use client";

import { useActionState } from "react";
import { loginWithPasswordAction, sendMagicLinkAction } from "./actions";

const initialState = null as string | null;

export function LoginForm() {
  const [passwordState, passwordAction, passwordPending] = useActionState(loginWithPasswordAction, initialState);
  const [magicState, magicAction, magicPending] = useActionState(sendMagicLinkAction, initialState);

  return (
    <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <form action={passwordAction} className="grid gap-4">
        <h2 className="text-xl font-semibold text-slate-900">Sign in</h2>
        <label className="grid gap-2 text-sm text-slate-700">
          Email
          <input name="email" type="email" required className="rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="grid gap-2 text-sm text-slate-700">
          Password
          <input name="password" type="password" required className="rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        {passwordState ? <p className="text-sm text-rose-600">{passwordState}</p> : null}
        <button
          type="submit"
          disabled={passwordPending}
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {passwordPending ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <form action={magicAction} className="grid gap-3 border-t border-slate-200 pt-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Or email magic link</h3>
        <input name="email" type="email" required placeholder="you@example.com" className="rounded-lg border border-slate-300 px-3 py-2" />
        {magicState ? <p className="text-sm text-slate-600">{magicState}</p> : null}
        <button
          type="submit"
          disabled={magicPending}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-60"
        >
          {magicPending ? "Sending..." : "Send magic link"}
        </button>
      </form>
    </div>
  );
}
