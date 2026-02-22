import { Suspense } from "react";
import LoginClient from "./LoginClient";

function LoginSkeleton() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="h-3 w-24 rounded bg-slate-200" />
        <div className="mt-3 h-8 w-72 rounded bg-slate-200" />
        <div className="mt-2 h-4 w-80 rounded bg-slate-200" />
        <div className="mt-5 h-11 rounded-lg bg-slate-100" />
        <div className="mt-3 h-11 rounded-lg bg-slate-100" />
        <div className="mt-3 h-11 rounded-lg bg-slate-100" />
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginClient />
    </Suspense>
  );
}
