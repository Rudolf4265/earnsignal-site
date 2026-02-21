"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { DiagnosticsApiError, submitDiagnosticsFile, submitDiagnosticsUrl } from "@/lib/api/diagnostics";
import { platforms, siteEnv, type PlatformSlug } from "@/lib/env";

type FormErrors = {
  platform?: string;
  source?: string;
  file?: string;
  url?: string;
};

const SESSION_REPORT_KEY = "earnsignal_diagnostic_report_v1";
const SESSION_PLATFORM_KEY = "earnsignal_diagnostic_platform";

export function DiagnosticsGenerateForm() {
  const router = useRouter();
  const [platform, setPlatform] = useState<PlatformSlug | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState("");
  const [apiErrorDetails, setApiErrorDetails] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const clearUrl = () => {
    setUrl("");
    setErrors((current) => ({ ...current, source: undefined, url: undefined }));
  };

  const clearFile = () => {
    setFile(null);
    setErrors((current) => ({ ...current, source: undefined, file: undefined }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    const trimmedUrl = url.trim();

    if (!platform) {
      nextErrors.platform = "Please select a platform.";
    }

    if (!file && !trimmedUrl) {
      nextErrors.source = "Upload a CSV file or provide a URL.";
    }

    if (file && trimmedUrl) {
      nextErrors.source = "Use either a CSV file or a URL, not both.";
    }

    if (file && !file.name.toLowerCase().endsWith(".csv")) {
      nextErrors.file = "Only .csv files are supported.";
    }

    if (trimmedUrl) {
      try {
        new URL(trimmedUrl);
      } catch {
        nextErrors.url = "Please enter a valid URL (including https://).";
      }
    }

    return nextErrors;
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    setApiError("");
    setApiErrorDetails([]);

    if (Object.keys(nextErrors).length > 0 || !platform) {
      return;
    }

    setLoading(true);

    try {
      const report = file
        ? await submitDiagnosticsFile(platform, file)
        : await submitDiagnosticsUrl(platform, url.trim());

      sessionStorage.setItem(SESSION_REPORT_KEY, JSON.stringify(report));
      sessionStorage.setItem(SESSION_PLATFORM_KEY, platform);
      router.push(siteEnv.diagnosticsReportPath || "/report");
    } catch (error) {
      if (error instanceof DiagnosticsApiError) {
        setApiError(error.message);
        setApiErrorDetails(error.details);
      } else if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("Could not generate report right now. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-10 rounded-xl border border-border bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Generate report</h2>
      <p className="mt-2 text-sm text-muted">Upload a CSV or provide a source URL to generate your diagnostic report.</p>

      {apiError ? (
        <Callout className="mt-4 border-red-200 bg-red-50 text-red-800">
          <p className="font-medium">We couldn&apos;t generate your report.</p>
          <p className="mt-1">{apiError}</p>
          {apiErrorDetails.length ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {apiErrorDetails.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          ) : null}
        </Callout>
      ) : null}

      <form className="mt-4 grid gap-4" onSubmit={onSubmit} noValidate>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="platform">
            Platform
          </label>
          <select
            id="platform"
            className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm"
            value={platform}
            onChange={(event) => setPlatform(event.target.value as PlatformSlug)}
          >
            <option value="">Select a platform</option>
            {platforms.map((item) => (
              <option key={item} value={item}>
                {item[0].toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>
          {errors.platform ? <p className="mt-1 text-sm text-red-600">{errors.platform}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="diagnostic-file">
            CSV file
          </label>
          <input
            id="diagnostic-file"
            type="file"
            accept=".csv,text/csv"
            className="block w-full rounded-md border border-border bg-white px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5"
            onChange={(event) => {
              const nextFile = event.target.files?.[0] || null;
              setFile(nextFile);
              if (nextFile) {
                clearUrl();
              }
            }}
          />
          {errors.file ? <p className="mt-1 text-sm text-red-600">{errors.file}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="diagnostic-url">
            Source URL (optional)
          </label>
          <input
            id="diagnostic-url"
            type="url"
            inputMode="url"
            placeholder="https://..."
            className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
              if (event.target.value.trim()) {
                clearFile();
              }
            }}
          />
          {errors.url ? <p className="mt-1 text-sm text-red-600">{errors.url}</p> : null}
        </div>

        {errors.source ? <p className="text-sm text-red-600">{errors.source}</p> : null}

        <div className="pt-1">
          <Button type="submit" disabled={loading}>
            {loading ? "Generating report…" : "Generate report"}
          </Button>
        </div>
      </form>
    </section>
  );
}
