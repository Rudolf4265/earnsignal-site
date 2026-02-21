import type { DiagnosticReportV1 } from "@/lib/contracts/diagnostic";
import { SnapshotCard } from "@/components/report/SnapshotCard";
import { ExecutiveSummary } from "@/components/report/ExecutiveSummary";
import { GrowthRetention } from "@/components/report/GrowthRetention";
import { ContentPerformance } from "@/components/report/ContentPerformance";
import { Recommendations } from "@/components/report/Recommendations";
import { MilestoneGameplan } from "@/components/report/MilestoneGameplan";
import { WarningsPanel } from "@/components/report/WarningsPanel";
import { InputsSummary } from "@/components/report/InputsSummary";

export function ReportShell({ report }: { report: DiagnosticReportV1 }) {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-6">
        <p className="text-xs uppercase tracking-wide text-muted">Diagnostic report</p>
        <h1 className="mt-1 text-2xl font-semibold">EarnSignal Performance Report</h1>
        <p className="mt-2 text-sm text-muted">
          Report {report.report_id} • Generated {new Date(report.generated_at).toLocaleString()} • Platforms: {report.platforms_included.join(", ")}
        </p>
      </section>

      <SnapshotCard snapshot={report.snapshot} period={report.period} />
      <ExecutiveSummary section={report.executive_summary} />
      <GrowthRetention section={report.growth_retention} />
      <ContentPerformance section={report.content_performance} />
      <Recommendations section={report.recommendations} />
      <MilestoneGameplan section={report.milestone_gameplan} />
      <WarningsPanel warnings={report.warnings} />
      <InputsSummary inputs={report.inputs_summary} />
    </div>
  );
}
