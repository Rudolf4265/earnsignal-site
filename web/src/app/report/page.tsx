import type { Metadata } from "next";
import Link from "next/link";
import mockReport from "@/lib/contracts/fixtures/diagnostic_report_v1.mock.json";
import type { DiagnosticReportV1 } from "@/lib/contracts/diagnostic";
import { parseDiagnosticReport } from "@/lib/contracts/diagnostic.zod";
import { Container } from "@/components/ui/container";
import { ReportShell } from "@/components/report/ReportShell";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Report",
  description: "EarnSignal diagnostic report viewer.",
};

const getParsedReport = (): { report: DiagnosticReportV1 | null; error: string | null } => {
  try {
    return { report: parseDiagnosticReport(mockReport), error: null };
  } catch (error) {
    return {
      report: null,
      error: error instanceof Error ? error.message : "Unknown contract parsing error.",
    };
  }
};

export default async function ReportPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string; platform?: string }>;
}) {
  const params = await searchParams;
  const isDemo = params.demo === "1";

  if (!isDemo) {
    return (
      <Container className="py-16">
        <h1 className="text-3xl font-semibold">Report viewer</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Upload wiring coming soon. Use the demo report now, or come back once upload-to-report is enabled for your workspace.
        </p>
        <div className="mt-6 rounded-lg border border-border bg-white p-4 text-sm text-muted shadow-sm">
          {params.platform ? `Selected platform: ${params.platform}` : "No platform selected yet."}
        </div>
        <div className="mt-6 flex gap-3">
          <ButtonLink href="/report?demo=1">View demo report</ButtonLink>
          <ButtonLink href="/upload" variant="secondary">
            Go to upload
          </ButtonLink>
        </div>
      </Container>
    );
  }

  const parsed = getParsedReport();

  if (parsed.error || !parsed.report) {
    return (
      <Container className="py-16">
        <h1 className="text-3xl font-semibold">Report unavailable</h1>
        <p className="mt-3 text-muted">
          We couldn&apos;t render this diagnostic report because it does not match the expected contract version.
        </p>
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">{parsed.error}</div>
        <details className="mt-4 rounded-lg border border-border bg-white p-4 text-sm">
          <summary className="cursor-pointer font-medium">Copy debug details</summary>
          <pre className="mt-3 overflow-auto whitespace-pre-wrap break-all text-xs text-muted">{parsed.error}</pre>
        </details>
        <p className="mt-6 text-sm text-muted">
          Try the <Link className="text-accent hover:underline" href="/report?demo=1">demo report</Link> again or contact support.
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-10 sm:py-14">
      <ReportShell report={parsed.report} />
    </Container>
  );
}
