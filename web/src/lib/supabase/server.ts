import { createServerClient, type CookieOptions } from "@supabase/ssr";

type CookieStore = {
  get(name: string): string | undefined;
  set(name: string, value: string, options: CookieOptions): void;
  remove(name: string, options: CookieOptions): void;
};

export function createServerSupabaseClient(cookieStore: CookieStore) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string): string | undefined {
        return cookieStore.get(name);
      },
      set(name: string, value: string, options: CookieOptions): void {
        cookieStore.set(name, value, options);
      },
      remove(name: string, options: CookieOptions): void {
        cookieStore.remove(name, options);
      },
    },
  });
}
