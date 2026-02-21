import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
  }

  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient({
    get(name) {
      return cookieStore.get(name);
    },
    set(name, value, options) {
      cookieStore.set(name, value, options);
    },
    remove(name, options) {
      cookieStore.set(name, "", { ...options, maxAge: 0 });
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
  }

  return NextResponse.redirect(`${origin}/app`);
}
