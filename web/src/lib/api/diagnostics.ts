import { parseDiagnosticReport } from "@/lib/contracts/diagnostic.zod";
import type { DiagnosticReportV1 } from "@/lib/contracts/diagnostic";
import { siteEnv } from "@/lib/env";

type ValidationErrorItem = {
  message?: string;
  loc?: Array<string | number>;
  [key: string]: unknown;
};

type DiagnosticsErrorPayload = {
  message?: string;
  detail?: string;
  errors?: ValidationErrorItem[];
};

const REQUEST_TIMEOUT_MS = 30_000;
export const DIAGNOSTICS_TIMEOUT_MESSAGE = "Request timed out after 30 seconds. Please try again.";

export class DiagnosticsApiError extends Error {
  status: number;
  details: string[];

  constructor(message: string, status: number, details: string[] = []) {
    super(message);
    this.name = "DiagnosticsApiError";
    this.status = status;
    this.details = details;
  }
}

const endpointFor = (platform: string) => `${siteEnv.apiBaseUrl.replace(/\/$/, "")}/v1/diagnostics/${platform}`;

function assertUploadEnabled() {
  if (!siteEnv.diagnosticsUploadEnabled) {
    throw new Error("Diagnostics upload disabled");
  }

  if (!siteEnv.apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is required when diagnostics upload is enabled");
  }
}

const toDetailMessage = (error: ValidationErrorItem, fallbackIndex: number) => {
  const path = Array.isArray(error.loc) && error.loc.length
    ? `${error.loc.map((segment) => `${segment}`).join(".")}: `
    : "";

  return `${path}${error.message || `Validation error ${fallbackIndex + 1}`}`;
};

async function toDiagnosticsError(response: Response): Promise<DiagnosticsApiError> {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const json = (await response.json()) as DiagnosticsErrorPayload;
    const details = Array.isArray(json.errors)
      ? json.errors.map((error, index) => toDetailMessage(error, index))
      : [];
    const message = json.message || json.detail || `Diagnostics request failed (${response.status})`;
    return new DiagnosticsApiError(message, response.status, details);
  }

  const text = (await response.text()).trim();
  const message = text || `Diagnostics request failed (${response.status})`;
  return new DiagnosticsApiError(message, response.status);
}

async function requestDiagnostics(input: RequestInfo, init: RequestInit): Promise<DiagnosticReportV1> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(input, {
      ...init,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw await toDiagnosticsError(response);
    }

    return parseDiagnosticReport(await response.json());
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(DIAGNOSTICS_TIMEOUT_MESSAGE);
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function submitDiagnosticsFile(platform: string, file: File): Promise<DiagnosticReportV1> {
  assertUploadEnabled();

  const form = new FormData();
  form.set("file", file);

  return requestDiagnostics(endpointFor(platform), {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: form,
  });
}

export async function submitDiagnosticsUrl(platform: string, url: string): Promise<DiagnosticReportV1> {
  assertUploadEnabled();

  return requestDiagnostics(endpointFor(platform), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
}
