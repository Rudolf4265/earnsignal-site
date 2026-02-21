"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Container } from "@/components/ui/container";
import { ReportShell } from "@/components/report/ReportShell";
import type { DiagnosticReportV1 } from "@/lib/contracts/diagnostic";
import { parseDiagnosticReport } from "@/lib/contracts/diagnostic.zod";

const SESSION_REPORT_KEY = "earnsignal_diagnostic_report_v1";
const SESSION_PLATFORM_KEY = "earnsignal_diagnostic_platform";

type LoadState =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "ready"; report: DiagnosticReportV1; loadedFromSession: boolean }
  | { status: "error"; message: string };

const readReportState = (): LoadState => {
  const raw = sessionStorage.getItem(SESSION_REPORT_KEY);

  if (!raw) {
    return { status: "empty" };
  }

  try {
    const parsedJson = JSON.parse(raw) as unknown;
    const report = parseDiagnosticReport(parsedJson);
    sessionStorage.removeItem(SESSION_REPORT_KEY);
    sessionStorage.removeItem(SESSION_PLATFORM_KEY);

    return { status: "ready", report, loadedFromSession: true };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unable to load report data.",
    };
  }
};

export function SessionStorageReport() {
  const router = useRouter();
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    Promise.resolve().then(() => {
      setState(readReportState());
    });
  }, []);

  const clearAndReturnToUpload = () => {
    sessionStorage.removeItem(SESSION_REPORT_KEY);
    sessionStorage.removeItem(SESSION_PLATFORM_KEY);
    router.push("/upload");
  };

  if (state.status === "loading") {
    return (
      <Container className="py-16">
        <p className="text-sm text-muted">Loading report…</p>
      </Container>
    );
  }

  if (state.status === "empty") {
    return (
      <Container className="py-16">
        <h1 className="text-3xl font-semibold">Report viewer</h1>
        <p className="mt-3 max-w-2xl text-muted">No report is loaded yet. Generate a report from the upload page to view results here.</p>
        <div className="mt-6">
          <ButtonLink href="/upload">Generate a report from /upload</ButtonLink>
        </div>
      </Container>
    );
  }

  if (state.status === "error") {
    return (
      <Container className="py-16">
        <h1 className="text-3xl font-semibold">Report unavailable</h1>
        <p className="mt-3 text-muted">We couldn&apos;t render your report due to an unexpected data format.</p>
        <Callout className="mt-6 border-amber-200 bg-amber-50 text-amber-900">
          <p className="font-medium">Your report data couldn&apos;t be validated.</p>
          <p className="mt-1">Please generate a new report from upload and try again.</p>
        </Callout>
        <details className="mt-4 rounded-lg border border-border bg-white p-4 text-sm">
          <summary className="cursor-pointer font-medium">Technical details</summary>
          <pre className="mt-3 overflow-auto whitespace-pre-wrap break-all text-xs text-muted">{state.message}</pre>
        </details>
        <p className="mt-6 text-sm text-muted">
          Return to <Link className="text-accent hover:underline" href="/upload">/upload</Link> to generate a fresh report.
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-10 sm:py-14">
      <ReportShell
        report={state.report}
        loadedFromSession={state.loadedFromSession}
        onClearReport={clearAndReturnToUpload}
      />
    </Container>
  );
}
