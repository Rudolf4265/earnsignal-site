import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adaptDashboard, adaptMe, adaptReportDetail, adaptReports } from "@/lib/adapters";
import { fetchDashboard, fetchMe, fetchReportDetail, fetchReports } from "@/lib/api";
import { mockDashboard, mockMe, mockReportDetail, mockReports } from "@/lib/mockData";
import { createServerSupabaseClient } from "@/lib/supabase/server";

async function getSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerSupabaseClient({
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
}

export async function requireAuth() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { user, supabase };
}

export async function loadMe(accessToken: string) {
  try {
    const dto = await fetchMe(accessToken);
    return { me: adaptMe(dto), demoMode: false };
  } catch {
    return { me: mockMe, demoMode: true };
  }
}

export async function loadDashboard(accessToken: string) {
  try {
    const dto = await fetchDashboard(accessToken);
    return { dashboard: adaptDashboard(dto), demoMode: false };
  } catch {
    return { dashboard: mockDashboard, demoMode: true };
  }
}

export async function loadReports(accessToken: string) {
  try {
    const dto = await fetchReports(accessToken);
    return { reports: adaptReports(dto), demoMode: false };
  } catch {
    return { reports: mockReports, demoMode: true };
  }
}

export async function loadReportDetail(accessToken: string, id: string) {
  try {
    const dto = await fetchReportDetail(accessToken, id);
    return { report: adaptReportDetail(dto), demoMode: false };
  } catch {
    return { report: { ...mockReportDetail, id }, demoMode: true };
  }
}
