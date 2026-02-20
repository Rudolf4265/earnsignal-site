const trim = (value?: string | null) => value?.trim() || "";

const apiBaseUrl = trim(process.env.NEXT_PUBLIC_API_BASE_URL);
const templatesFromApi = apiBaseUrl ? `${apiBaseUrl.replace(/\/$/, "")}/v1/templates` : "";

export const siteEnv = {
  siteUrl: trim(process.env.NEXT_PUBLIC_SITE_URL) || "https://earnsignal.com",
  streamlitUploaderUrl: trim(process.env.NEXT_PUBLIC_STREAMLIT_UPLOADER_URL),
  templatesBaseUrl:
    trim(process.env.NEXT_PUBLIC_TEMPLATES_BASE_URL) || templatesFromApi,
  csvDocsUrl: trim(process.env.NEXT_PUBLIC_CSV_DOCS_URL),
  supportEmail: trim(process.env.NEXT_PUBLIC_SUPPORT_EMAIL) || "support@earnsignal.com",
  journalUrl: trim(process.env.NEXT_PUBLIC_JOURNAL_URL),
};

export const platforms = [
  "instagram",
  "youtube",
  "tiktok",
  "onlyfans",
  "patreon",
  "substack",
  "passes",
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
