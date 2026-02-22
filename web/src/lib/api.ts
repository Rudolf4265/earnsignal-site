const trim = (value?: string | null) => value?.trim() ?? "";

function getBaseUrl() {
  const base = trim(process.env.NEXT_PUBLIC_API_BASE_URL);
  if (!base) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is missing.");
  }
  return base.replace(/\/$/, "");
}

export async function apiFetch(path: string, accessToken: string) {
  const base = getBaseUrl();
  const response = await fetch(`${base}${path.startsWith("/") ? path : `/${path}`}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export const fetchMe = (accessToken: string) => apiFetch("/v1/me", accessToken);
export const fetchDashboard = (accessToken: string) => apiFetch("/v1/dashboard", accessToken);
export const fetchReports = (accessToken: string) => apiFetch("/v1/reports", accessToken);
export const fetchReportDetail = (accessToken: string, id: string) => apiFetch(`/v1/reports/${id}`, accessToken);
