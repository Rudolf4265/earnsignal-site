export const DIAGNOSTIC_CONTRACT_VERSION = "v1" as const;

export type Period = {
  start_month: string;
  end_month: string;
  months_included: number;
};

export type SnapshotSection = {
  mrr_current_cents: number;
  mrr_trend_3mo_pct: number;
  active_subs_current: number;
  arpu_cents: number;
  monthly_churn_rate_pct: number;
  stage: "early_stage" | "mid_size" | "growth" | "scaled";
  stage_thresholds: Record<string, unknown>;
};

export type Insight = {
  code: string;
  title: string;
  detail: string;
  severity: "info" | "warn" | "critical";
  evidence: Record<string, unknown>;
};

export type ExecutiveSummarySection = {
  primary_growth_lever: "retention" | "pricing" | "content_conversion";
  momentum: "accelerating" | "flat" | "declining";
  top_insights: Insight[];
  metrics_highlights: {
    churn_band: "strong" | "needs_work" | "critical";
    conversion_band?: "strong" | "average" | "weak";
    arpu_band: "below_target" | "on_track" | "above_target";
  };
  confidence: "high" | "medium" | "low";
};

export type MonthlyPoint = {
  month: string;
  value: number;
};

export type MonthlySummaryRow = {
  month: string;
  mrr_cents: number;
  active_subs: number;
  new_subs: number;
  cancelled_subs: number;
  net_subs_change: number;
  churn_rate_pct: number;
};

export type GrowthRetentionSection = {
  mrr_series: MonthlyPoint[];
  subs_series: MonthlyPoint[];
  new_subs_series: MonthlyPoint[];
  cancelled_subs_series: MonthlyPoint[];
  churn_rate_series_pct: MonthlyPoint[];
  narrative: string;
  summary_table: MonthlySummaryRow[];
};

export type ContentTypeRow = {
  content_type: string;
  posts: number;
  views: number | null;
  paid_signups: number | null;
  conversion_rate_pct: number | null;
  tier_upgrades: number | null;
};

export type ContentPerformanceSection = {
  by_type: ContentTypeRow[];
  best_type: string;
  overall_conversion_rate_pct: number | null;
  notes: string[];
};

export type RecommendationBlock = {
  title: string;
  why_it_matters: string;
  what_to_do: string[];
  expected_impact: string;
  numbers: Record<string, unknown>;
  priority: "p0" | "p1" | "p2";
};

export type RecommendationsSection = {
  blocks: RecommendationBlock[];
};

export type MilestoneGameplanSection = {
  current_mrr_cents: number;
  target_mrr_cents: number;
  net_new_mrr_needed_cents: number;
  arpu_cents: number;
  net_new_subs_needed: number;
  monthly_churn_subs: number;
  gross_new_subs_needed: number;
  assumptions: {
    churn_rate_pct_used: number;
    arpu_used_cents: number;
    time_horizon_months: number;
  };
  explanation: string;
};

export type Warning = {
  code: string;
  message: string;
  severity: "info" | "warn" | "critical";
};

export type InputsSummary = {
  months_present: number;
  months_missing: number;
  missing_months?: string[];
  rows_consumed?: number;
  notes?: string[];
};

export type DiagnosticReportV1 = {
  report_id: string;
  creator_id: string;
  generated_at: string;
  period: Period;
  platforms_included: string[];
  snapshot: SnapshotSection;
  executive_summary: ExecutiveSummarySection;
  growth_retention: GrowthRetentionSection;
  content_performance: ContentPerformanceSection | null;
  recommendations: RecommendationsSection;
  milestone_gameplan: MilestoneGameplanSection;
  warnings: Warning[];
  inputs_summary: InputsSummary;
};
