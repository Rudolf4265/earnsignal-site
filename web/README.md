# EarnSignal Next.js App (`/web`)

This folder contains the App Router Next.js application that should be deployed to Vercel.

## Local development

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Environment variables

1. Copy `.env.example` to `.env.local` for local development.
2. Set the same values in Vercel (**Preview** + **Production**) for deployment.

### Public variables (`NEXT_PUBLIC_*`)

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_STREAMLIT_UPLOADER_URL`
- `NEXT_PUBLIC_TEMPLATES_BASE_URL` (preferred)
- `NEXT_PUBLIC_API_BASE_URL` (fallback for templates)
- `NEXT_PUBLIC_CSV_DOCS_URL`
- `NEXT_PUBLIC_SUPPORT_EMAIL`

### Server-only variables

- `POSTMARK_SERVER_TOKEN`
- `POSTMARK_FROM_EMAIL`
- `POSTMARK_TO_EMAIL`

### `/api/notify` behavior

- If all Postmark variables are present, the endpoint sends mail via Postmark.
- If any Postmark variable is missing, it logs fallback details server-side and still returns `202`.

## Vercel deployment setup

In Vercel project settings:

- **Framework Preset:** Next.js
- **Root Directory:** `web`
- **Install Command:** `npm install` (or `npm ci`)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

For full steps (including domain wiring and smoke tests), see:

- `../docs/VERCEL_DEPLOYMENT.md`

## Post-deploy smoke tests

Check:

- `/`
- `/diagnostic`
- `/upload`
- `/privacy`
- `/terms`

Then submit the upload interest form to exercise `/api/notify`.

## Predeploy sanity checks

From repo root:

- `./scripts/web_predeploy_check.ps1` (PowerShell)
- `./scripts/web_predeploy_check.sh` (bash)
