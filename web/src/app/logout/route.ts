import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
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

  await supabase.auth.signOut();

  const origin = new URL(request.url).origin;
  return NextResponse.redirect(`${origin}/login`, { status: 303 });
}
