import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { type CookieOptions } from "@supabase/ssr";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient({
    get(name: string): string | undefined {
      return cookieStore.get(name)?.value;
    },
    set(name: string, value: string, options: CookieOptions): void {
      cookieStore.set({ name, value, ...options });
    },
    remove(name: string, options: CookieOptions): void {
      cookieStore.set({ name, value: "", ...options, maxAge: 0 });
    },
  });

  await supabase.auth.signOut();

  const origin = new URL(request.url).origin;
  return NextResponse.redirect(`${origin}/login`, { status: 303 });
}
