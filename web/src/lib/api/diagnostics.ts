import { parseDiagnosticReport } from "@/lib/contracts/diagnostic.zod";
import type { DiagnosticReportV1 } from "@/lib/contracts/diagnostic";
import { siteEnv } from "@/lib/env";

const endpointFor = (platform: string) => `${siteEnv.apiBaseUrl.replace(/\/$/, "")}/v1/diagnostics/${platform}`;

function assertUploadEnabled() {
  if (!siteEnv.diagnosticsUploadEnabled) {
    throw new Error("Diagnostics upload disabled");
  }

  if (!siteEnv.apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is required when diagnostics upload is enabled");
  }
}

export async function submitDiagnosticsFile(platform: string, file: File): Promise<DiagnosticReportV1> {
  assertUploadEnabled();

  const form = new FormData();
  form.set("file", file);

  const response = await fetch(endpointFor(platform), {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    throw new Error(`Diagnostics request failed (${response.status})`);
  }

  return parseDiagnosticReport(await response.json());
}

export async function submitDiagnosticsUrl(platform: string, url: string): Promise<DiagnosticReportV1> {
  assertUploadEnabled();

  const response = await fetch(endpointFor(platform), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error(`Diagnostics request failed (${response.status})`);
  }

  return parseDiagnosticReport(await response.json());
}
