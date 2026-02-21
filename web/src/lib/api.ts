const trim = (value?: string | null) => value?.trim() ?? "";

const API_BASE_URL = trim(process.env.NEXT_PUBLIC_API_BASE_URL);

type DashboardData = {
  kpis: Array<{ label: string; value: string; delta: string }>;
  keySignals: string[];
  strategicActions: string[];
  revenueSeries: Array<{ month: string; value: number }>;
  platformMix: Array<{ platform: string; share: number }>;
  uploads: { files: number; lastSync: string; coverage: string };
};

type ReportsData = {
  kpiStrip: Array<{ label: string; value: string }>;
  reports: Array<{ id: string; title: string; status: "Ready" | "Needs Attention" | "Processing"; period: string }>;
};

const mockData: Record<string, unknown> = {
  "/dashboard": {
    kpis: [
      { label: "MRR", value: "$48.2k", delta: "+6.3%" },
      { label: "Paid Conversion", value: "5.8%", delta: "+0.9pp" },
      { label: "Churn", value: "3.1%", delta: "-0.4pp" },
    ],
    keySignals: ["Annual plan uptake rose 13% on Patreon.", "Substack trial-to-paid slowed in top funnel segment."],
    strategicActions: ["Raise mid-tier Patreon price by 7% for new subscribers.", "Launch email onboarding sequence to recover trial users."],
    revenueSeries: [
      { month: "Sep", value: 31 },
      { month: "Oct", value: 34 },
      { month: "Nov", value: 39 },
      { month: "Dec", value: 42 },
      { month: "Jan", value: 48 },
    ],
    platformMix: [
      { platform: "Patreon", share: 64 },
      { platform: "Substack", share: 29 },
      { platform: "Other", share: 7 },
    ],
    uploads: { files: 6, lastSync: "2 hours ago", coverage: "95% expected fields" },
  } satisfies DashboardData,
  "/reports": {
    kpiStrip: [
      { label: "Reports Ready", value: "4" },
      { label: "Needs Attention", value: "1" },
      { label: "Processing", value: "2" },
    ],
    reports: [
      { id: "wk-07", title: "Weekly Revenue Briefing", status: "Ready", period: "Week 07" },
      { id: "wk-06", title: "Weekly Revenue Briefing", status: "Needs Attention", period: "Week 06" },
      { id: "wk-05", title: "Weekly Revenue Briefing", status: "Processing", period: "Week 05" },
    ],
  } satisfies ReportsData,
};

export async function apiFetch<T>(path: string, token: string): Promise<{ data: T; demoMode: boolean; error?: string }> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!API_BASE_URL) {
    return { data: mockData[normalizedPath] as T, demoMode: true, error: "API base URL not configured." };
  }

  try {
    const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}${normalizedPath}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return { data: (await response.json()) as T, demoMode: false };
  } catch (error) {
    return {
      data: (mockData[normalizedPath] as T) ?? ({} as T),
      demoMode: true,
      error: error instanceof Error ? error.message : "Unable to reach API",
    };
  }
}
