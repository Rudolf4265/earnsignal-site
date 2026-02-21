import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "es_access_token";
const REFRESH_TOKEN_COOKIE = "es_refresh_token";

const trim = (value?: string | null) => value?.trim() ?? "";

export const supabaseEnv = {
  url: trim(process.env.NEXT_PUBLIC_SUPABASE_URL),
  anonKey: trim(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
};

export type SupabaseSession = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: { id: string; email?: string };
};

const authHeaders = {
  apikey: supabaseEnv.anonKey,
  "Content-Type": "application/json",
};

function ensureConfigured() {
  if (!supabaseEnv.url || !supabaseEnv.anonKey) {
    throw new Error("Supabase env is not configured.");
  }
}

export async function signInWithPassword(email: string, password: string) {
  ensureConfigured();
  const response = await fetch(`${supabaseEnv.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Invalid email or password.");
  }

  return (await response.json()) as SupabaseSession;
}

export async function sendMagicLink(email: string) {
  ensureConfigured();
  const response = await fetch(`${supabaseEnv.url}/auth/v1/otp`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ email, create_user: true }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to send magic link.");
  }
}

export async function getUserFromAccessToken(accessToken: string) {
  ensureConfigured();
  const response = await fetch(`${supabaseEnv.url}/auth/v1/user`, {
    headers: { ...authHeaders, Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as { id: string; email?: string };
}

export async function getAuthFromCookies() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  if (!accessToken) return null;
  const user = await getUserFromAccessToken(accessToken);
  if (!user) return null;
  return { accessToken, user };
}

export async function setSessionCookies(session: SupabaseSession) {
  const cookieStore = await cookies();
  const maxAge = Math.max(session.expires_in, 60);
  cookieStore.set(ACCESS_TOKEN_COOKIE, session.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  cookieStore.set(REFRESH_TOKEN_COOKIE, session.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSessionCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
}
