import { z } from "zod";
import type { DiagnosticReportV1 } from "@/lib/contracts/diagnostic";

const sectionLabel = (path: PropertyKey[]) => {
  const root = path[0];
  if (typeof root !== "string") return "report";
  return root.replace(/_/g, " ");
};

const PeriodSchema = z
  .object({
    start_month: z.string(),
    end_month: z.string(),
    months_included: z.number(),
  })
  .passthrough();

const SnapshotSectionSchema = z
  .object({
    mrr_current_cents: z.number(),
    mrr_trend_3mo_pct: z.number(),
    active_subs_current: z.number(),
    arpu_cents: z.number(),
    monthly_churn_rate_pct: z.number(),
    stage: z.enum(["early_stage", "mid_size", "growth", "scaled"]),
    stage_thresholds: z.record(z.string(), z.unknown()),
  })
  .passthrough();

const InsightSchema = z
  .object({
    code: z.string(),
    title: z.string(),
    detail: z.string(),
    severity: z.enum(["info", "warn", "critical"]),
    evidence: z.record(z.string(), z.unknown()),
  })
  .passthrough();

const ExecutiveSummarySectionSchema = z
  .object({
    primary_growth_lever: z.enum(["retention", "pricing", "content_conversion"]),
    momentum: z.enum(["accelerating", "flat", "declining"]),
    top_insights: z.array(InsightSchema),
    metrics_highlights: z
      .object({
        churn_band: z.enum(["strong", "needs_work", "critical"]),
        conversion_band: z.enum(["strong", "average", "weak"]).optional(),
        arpu_band: z.enum(["below_target", "on_track", "above_target"]),
      })
      .passthrough(),
    confidence: z.enum(["high", "medium", "low"]),
  })
  .passthrough();

const MonthlyPointSchema = z
  .object({
    month: z.string(),
    value: z.number(),
  })
  .passthrough();

const MonthlySummaryRowSchema = z
  .object({
    month: z.string(),
    mrr_cents: z.number(),
    active_subs: z.number(),
    new_subs: z.number(),
    cancelled_subs: z.number(),
    net_subs_change: z.number(),
    churn_rate_pct: z.number(),
  })
  .passthrough();

const GrowthRetentionSectionSchema = z
  .object({
    mrr_series: z.array(MonthlyPointSchema),
    subs_series: z.array(MonthlyPointSchema),
    new_subs_series: z.array(MonthlyPointSchema),
    cancelled_subs_series: z.array(MonthlyPointSchema),
    churn_rate_series_pct: z.array(MonthlyPointSchema),
    narrative: z.string(),
    summary_table: z.array(MonthlySummaryRowSchema),
  })
  .passthrough();

const ContentTypeRowSchema = z
  .object({
    content_type: z.string(),
    posts: z.number(),
    views: z.number().nullable(),
    paid_signups: z.number().nullable(),
    conversion_rate_pct: z.number().nullable(),
    tier_upgrades: z.number().nullable(),
  })
  .passthrough();

const ContentPerformanceSectionSchema = z
  .object({
    by_type: z.array(ContentTypeRowSchema),
    best_type: z.string(),
    overall_conversion_rate_pct: z.number().nullable(),
    notes: z.array(z.string()),
  })
  .passthrough();

const RecommendationBlockSchema = z
  .object({
    title: z.string(),
    why_it_matters: z.string(),
    what_to_do: z.array(z.string()),
    expected_impact: z.string(),
    numbers: z.record(z.string(), z.unknown()),
    priority: z.enum(["p0", "p1", "p2"]),
  })
  .passthrough();

const RecommendationsSectionSchema = z
  .object({
    blocks: z.array(RecommendationBlockSchema),
  })
  .passthrough();

const MilestoneGameplanSectionSchema = z
  .object({
    current_mrr_cents: z.number(),
    target_mrr_cents: z.number(),
    net_new_mrr_needed_cents: z.number(),
    arpu_cents: z.number(),
    net_new_subs_needed: z.number(),
    monthly_churn_subs: z.number(),
    gross_new_subs_needed: z.number(),
    assumptions: z
      .object({
        churn_rate_pct_used: z.number(),
        arpu_used_cents: z.number(),
        time_horizon_months: z.number(),
      })
      .passthrough(),
    explanation: z.string(),
  })
  .passthrough();

const WarningSchema = z
  .object({
    code: z.string(),
    message: z.string(),
    severity: z.enum(["info", "warn", "critical"]),
  })
  .passthrough();

const InputsSummarySchema = z
  .object({
    months_present: z.number(),
    months_missing: z.number(),
    missing_months: z.array(z.string()).optional(),
    rows_consumed: z.number().optional(),
    notes: z.array(z.string()).optional(),
  })
  .passthrough();

export const DiagnosticReportV1Schema = z
  .object({
    report_id: z.string(),
    creator_id: z.string(),
    generated_at: z.string(),
    period: PeriodSchema,
    platforms_included: z.array(z.string()),
    snapshot: SnapshotSectionSchema,
    executive_summary: ExecutiveSummarySectionSchema,
    growth_retention: GrowthRetentionSectionSchema,
    content_performance: ContentPerformanceSectionSchema.nullable(),
    recommendations: RecommendationsSectionSchema,
    milestone_gameplan: MilestoneGameplanSectionSchema,
    warnings: z.array(WarningSchema),
    inputs_summary: InputsSummarySchema,
  })
  .passthrough();

export function parseDiagnosticReport(json: unknown): DiagnosticReportV1 {
  const parsed = DiagnosticReportV1Schema.safeParse(json);

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const section = issue ? sectionLabel(issue.path) : "report";
    const path = issue?.path.length ? ` at ${issue.path.join(".")}` : "";
    const reason = issue?.message ?? "Unknown validation error";
    throw new Error(`Diagnostic report contract mismatch in ${section}${path}: ${reason}`);
  }

  return parsed.data;
}
