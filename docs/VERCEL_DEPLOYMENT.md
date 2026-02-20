# Vercel Deployment Guide (`/web` Next.js app)

This repo contains two sites:
- **Eleventy site at repo root** (existing/static site)
- **Next.js App Router app in `web/`** (deploy this one to Vercel)

This guide covers deploying only the Next.js app.

## 1) Create the Vercel project

1. In Vercel, click **Add New → Project** and import this GitHub repository.
2. Confirm these settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** `web`
   - **Install Command:** `npm install` (or `npm ci`)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
3. Save and continue to environment variable setup before first production deploy.

## 2) Configure environment variables (Production + Preview)

Set these in **Vercel Project → Settings → Environment Variables** for both Production and Preview.

| Variable | Required | Purpose | Example |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical public site URL | `https://app.earnsignal.com` |
| `NEXT_PUBLIC_STREAMLIT_UPLOADER_URL` | Optional | External secure uploader link shown on `/upload` | `https://your-uploader.streamlit.app` |
| `NEXT_PUBLIC_TEMPLATES_BASE_URL` | Preferred | Base URL for CSV templates (`/{platform}.csv` appended) | `https://cdn.example.com/templates` |
| `NEXT_PUBLIC_API_BASE_URL` | Fallback | Used only when templates base URL is not set; appends `/v1/templates` automatically | `https://api.example.com` |
| `NEXT_PUBLIC_CSV_DOCS_URL` | Optional | Link for schema documentation on `/diagnostic` | `https://docs.example.com/csv-schema` |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Optional | Support email rendered in the app | `admin@earnsignalstudio.com` |
| `POSTMARK_SERVER_TOKEN` | Optional (for email sending) | Postmark server token for `/api/notify` | `postmark-server-token` |
| `POSTMARK_FROM_EMAIL` | Optional (for email sending) | From address for notification emails | `no-reply@earnsignal.com` |
| `POSTMARK_TO_EMAIL` | Optional (for email sending) | Destination inbox for interest notifications | `ops@earnsignal.com` |

### `/api/notify` behavior with and without Postmark variables

- **With all Postmark variables set:** `/api/notify` sends an email via Postmark and returns `202` on success.
- **Without one or more Postmark variables:** `/api/notify` logs a fallback message server-side and still returns `202` (so form flow still works).

## 3) Domain wiring (Vercel + DNS provider such as Cloudflare)

1. In Vercel: **Project → Settings → Domains → Add Domain**.
2. Add your chosen domain/subdomain.
3. In DNS (e.g., Cloudflare), follow Vercel’s exact DNS record instructions.
4. Pick one canonical host strategy:
   - Prefer apex (e.g., `earnsignal.com`) and redirect `www`, **or**
   - Prefer `www` and redirect apex.

## 4) Smoke tests after deploy

After first deployment and after major changes, validate:

1. Page loads:
   - `/`
   - `/diagnostic`
   - `/upload`
   - `/privacy`
   - `/terms`
2. `/upload` behavior:
   - Uploader button appears only if `NEXT_PUBLIC_STREAMLIT_UPLOADER_URL` is set.
3. Template/docs links:
   - Template links render when templates URL env is configured.
   - “Templates available soon.” appears when template env is missing.
   - Schema docs link renders only when `NEXT_PUBLIC_CSV_DOCS_URL` is set.
4. Notification API:
   - Submit email form and verify `202` response from `/api/notify`.
   - If Postmark vars are configured, confirm email delivery.

## 5) Local predeploy sanity checks

Run from repository root:

- PowerShell: `./scripts/web_predeploy_check.ps1`
- Bash: `./scripts/web_predeploy_check.sh`

These run install + lint + typecheck + build in `web/`.

## Notes

- The `/api/notify` rate limiter uses an **in-memory serverless map** per runtime instance. This is acceptable for v1/basic abuse control, but it is not globally shared across instances.
