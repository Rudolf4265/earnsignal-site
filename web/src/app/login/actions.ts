"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export async function signInWithPassword(_: string | null, formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!email || !password) {
    return "Enter email and password.";
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

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return error.message;
  }

  redirect("/app");
}

export async function signInWithOtp(_: string | null, formData: FormData) {
  const email = String(formData.get("email") || "").trim();

  if (!email) {
    return "Enter an email address.";
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

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${siteUrl()}/auth/callback`,
    },
  });

  if (error) {
    return error.message;
  }

  return "Check your email for a secure sign-in link.";
}
