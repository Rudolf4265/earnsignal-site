"use client";

import { Button } from "@/components/ui/button";
import { SnapshotCard } from "@/components/report/SnapshotCard";
import { ExecutiveSummary } from "@/components/report/ExecutiveSummary";
import { GrowthRetention } from "@/components/report/GrowthRetention";
import { ContentPerformance } from "@/components/report/ContentPerformance";
import { Recommendations } from "@/components/report/Recommendations";
import { MilestoneGameplan } from "@/components/report/MilestoneGameplan";
import { WarningsPanel } from "@/components/report/WarningsPanel";
import { InputsSummary } from "@/components/report/InputsSummary";
import { Callout } from "@/components/ui/callout";
import type { DiagnosticReportV1 } from "@/lib/contracts/diagnostic";

type ReportShellProps = {
  report: DiagnosticReportV1;
  loadedFromSession?: boolean;
  isDemo?: boolean;
  onClearReport?: () => void;
};

const downloadReportJson = (report: DiagnosticReportV1) => {
  const payload = JSON.stringify(report, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const safeId = report.report_id.replace(/[^a-zA-Z0-9_-]/g, "_");

  anchor.href = objectUrl;
  anchor.download = `earnsignal_report_${safeId}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
};

export function ReportShell({ report, loadedFromSession = false, isDemo = false, onClearReport }: ReportShellProps) {
  return (
    <div className="space-y-6">
      {loadedFromSession ? (
        <Callout className="border-green-200 bg-green-50 text-green-900">
          <p className="font-medium">Report generated successfully.</p>
          <p className="mt-1 text-sm">Save a copy using Download JSON before leaving this page.</p>
        </Callout>
      ) : null}

      <section className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Diagnostic report</p>
            <h1 className="mt-1 text-2xl font-semibold">EarnSignal Performance Report</h1>
            <p className="mt-2 text-sm text-muted">
              Report {report.report_id} • Generated {new Date(report.generated_at).toLocaleString()} • Platforms: {report.platforms_included.join(", ")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" onClick={() => downloadReportJson(report)}>
              Download JSON
            </Button>
            {!isDemo && onClearReport ? (
              <Button type="button" variant="ghost" onClick={onClearReport}>
                Clear report
              </Button>
            ) : null}
          </div>
        </div>
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
