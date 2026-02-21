import { redirect } from "next/navigation";
import { getAuthFromCookies } from "@/lib/supabase";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const auth = await getAuthFromCookies();
  if (auth) {
    redirect("/app");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto grid w-full max-w-md gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">EarnSignal</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Financial briefing workspace</h1>
          <p className="mt-2 text-sm text-slate-600">Sign in to access your dashboard, data connections, and weekly briefings.</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
