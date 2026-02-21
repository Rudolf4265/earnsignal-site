const trim = (value?: string | null) => value?.trim() || "";

const apiBaseUrl = trim(process.env.NEXT_PUBLIC_API_BASE_URL);
const templatesFromApi = apiBaseUrl ? `${apiBaseUrl.replace(/\/$/, "")}/v1/templates` : "";
const diagnosticsReportPath = trim(process.env.NEXT_PUBLIC_DIAGNOSTICS_REPORT_PATH) || "/report";
const uploadFlag = trim(process.env.NEXT_PUBLIC_ENABLE_DIAGNOSTICS_UPLOAD).toLowerCase();
const diagnosticsUploadEnabled = uploadFlag === "1" || uploadFlag === "true";

export const siteEnv = {
  siteUrl: trim(process.env.NEXT_PUBLIC_SITE_URL) || "https://earnsignal.com",
  streamlitUploaderUrl: trim(process.env.NEXT_PUBLIC_STREAMLIT_UPLOADER_URL),
  templatesBaseUrl:
    trim(process.env.NEXT_PUBLIC_TEMPLATES_BASE_URL) || templatesFromApi,
  csvDocsUrl: trim(process.env.NEXT_PUBLIC_CSV_DOCS_URL),
  supportEmail: trim(process.env.NEXT_PUBLIC_SUPPORT_EMAIL) || "support@earnsignal.com",
  apiBaseUrl,
  supabaseUrl: trim(process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabaseAnonKey: trim(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  diagnosticsUploadEnabled,
  diagnosticsReportPath,
};

export const platforms = [
  "patreon",
  "substack",
  "youtube",
  "instagram",
  "tiktok",
  "onlyfans",
] as const;

export type PlatformSlug = (typeof platforms)[number];

export const getTemplateLinks = () =>
  platforms.map((platform) => ({
    platform,
    label: platform[0].toUpperCase() + platform.slice(1),
    href: siteEnv.templatesBaseUrl
      ? `${siteEnv.templatesBaseUrl.replace(/\/$/, "")}/${platform}.csv`
      : "",
  }));
