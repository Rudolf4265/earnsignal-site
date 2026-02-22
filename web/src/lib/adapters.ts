export function adaptMe(dto: any) {
  return {
    id: dto?.id ?? "demo-user",
    email: dto?.email ?? "demo@earnsignal.com",
    dataQualityScore: Number(dto?.data_quality_score ?? dto?.dataQualityScore ?? 92),
    lastIngestionAt: dto?.last_ingestion_at ?? dto?.lastIngestionAt ?? "Recently",
  };
}

export function adaptDashboard(dto: any) {
  const kpis = dto?.kpis ?? [
    { label: "Net Revenue", value: "$48.2k", delta: "+6.3%", format: "currency" },
    { label: "Subscribers", value: "12,480", delta: "+4.1%", format: "number" },
    { label: "Churn Risk", value: "3.1%", delta: "-0.4pp", format: "percent" },
  ];

  return {
    kpis,
    keySignals: dto?.key_signals ?? dto?.keySignals ?? [
      { type: "up", title: "Patreon annual plan lift", description: "Annual conversions up 13% this week.", confidence: 0.86 },
      { type: "down", title: "Substack trial slowdown", description: "Trial-to-paid is soft in high-volume cohorts.", confidence: 0.74 },
    ],
    strategicActions: dto?.strategic_actions ?? dto?.strategicActions ?? [
      { rank: 1, title: "Reprice mid-tier offer", expectedImpact: "High", effort: "Medium", confidence: 0.79 },
      { rank: 2, title: "Add trial reactivation email", expectedImpact: "Medium", effort: "Low", confidence: 0.72 },
    ],
    platformMix: dto?.platform_mix ?? dto?.platformMix ?? [
      { platform: "Patreon", percent: 62, revenue: "$29.8k" },
      { platform: "Substack", percent: 24, revenue: "$11.6k" },
      { platform: "YouTube CSV", percent: 14, revenue: "$6.8k" },
    ],
    revenueSeries: dto?.revenue_series ?? dto?.revenueSeries ?? [
      { period: "Sep", value: 31 },
      { period: "Oct", value: 35 },
      { period: "Nov", value: 39 },
      { period: "Dec", value: 43 },
      { period: "Jan", value: 48 },
    ],
    uploads: dto?.uploads ?? { files: 6, coverage: "95%", summary: "All core files validated." },
  };
}

export function adaptReports(dtoList: any) {
  const list = Array.isArray(dtoList) ? dtoList : dtoList?.reports ?? [];
  return {
    reports: list.length
      ? list.map((dto: any) => ({
          id: String(dto.id),
          title: dto.title ?? "Weekly Revenue Briefing",
          platforms: dto.platforms ?? ["Patreon", "Substack"],
          status: dto.status ?? "Ready",
          netRevenue: dto.net_revenue ?? dto.netRevenue ?? "$48.2k",
          subscribers: dto.subscribers ?? "12,480",
          churnRisk: dto.churn_risk ?? dto.churnRisk ?? "3.1%",
          topSignal: dto.top_signal ?? dto.topSignal ?? "Upsell bundle conversion improving.",
          warningsCount: dto.warnings_count ?? 0,
          errorsCount: dto.errors_count ?? 0,
          generatedAt: dto.generated_at ?? dto.generatedAt ?? "Today",
        }))
      : [
          {
            id: "wk-07",
            title: "Weekly Revenue Briefing",
            platforms: ["Patreon", "Substack"],
            status: "Ready",
            netRevenue: "$48.2k",
            subscribers: "12,480",
            churnRisk: "3.1%",
            topSignal: "Upsell bundle conversion improving.",
            warningsCount: 0,
            errorsCount: 0,
            generatedAt: "Today",
          },
        ],
  };
}

export function adaptReportDetail(dto: any) {
  const id = String(dto?.id ?? "wk-07");
  const sectionsNav = [
    { id: "executive-summary", label: "Executive Summary" },
    { id: "revenue-snapshot", label: "Revenue Snapshot" },
    { id: "audience-signals", label: "Audience Signals" },
    { id: "retention-risks", label: "Retention Risks" },
    { id: "strategic-actions", label: "Strategic Actions" },
  ];

  return {
    id,
    title: dto?.title ?? "Weekly Revenue Briefing",
    platforms: dto?.platforms ?? ["Patreon", "Substack", "YouTube CSV"],
    generatedAt: dto?.generated_at ?? dto?.generatedAt ?? "Today",
    sectionsNav,
    sections:
      dto?.sections ??
      sectionsNav.reduce((acc, section) => {
        acc[section.id] = {
          heading: section.label,
          body: "Structured summary content appears here once data is finalized.",
        };
        return acc;
      }, {} as Record<string, { heading: string; body: string }>),
  };
}
