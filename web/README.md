# EarnSignal Next.js App (`/web`)

This folder contains the App Router Next.js application deployed to Vercel.

## Local development

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_API_BASE_URL` (for FastAPI `/v1/*` endpoints)
- `NEXT_PUBLIC_SITE_URL` (used for magic link callback redirect)
- `NEXT_PUBLIC_STREAMLIT_UPLOADER_URL`
- `NEXT_PUBLIC_TEMPLATES_BASE_URL`
- `NEXT_PUBLIC_CSV_DOCS_URL`
- `NEXT_PUBLIC_SUPPORT_EMAIL`

Server-only variables for `/api/notify`:

- `POSTMARK_SERVER_TOKEN`
- `POSTMARK_FROM_EMAIL`
- `POSTMARK_TO_EMAIL`

## Supabase auth callback requirement

In Supabase Auth settings, include this redirect URL:

- `{NEXT_PUBLIC_SITE_URL}/auth/callback`

Example local value:

- `http://localhost:3000/auth/callback`

## Vercel deployment setup

- **Framework Preset:** Next.js
- **Root Directory:** `web`
- **Install Command:** `npm install` (or `npm ci`)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

## Predeploy sanity checks

From repo root:

- `./scripts/web_predeploy_check.ps1` (PowerShell)
- `./scripts/web_predeploy_check.sh` (bash)
