# EarnSignal Site Repository

This repository contains two separate sites:

1. **Eleventy site at repository root** (existing static site workflows)
2. **Next.js App Router app in `web/`** (deploy this app to Vercel)

## Next.js app quick start (`web/`)

```bash
cd web
npm install
npm run dev
```

Open `http://localhost:3000`.

## Vercel deployment target

When creating the Vercel project for this repository, set:

- **Framework Preset:** Next.js
- **Root Directory:** `web`
- **Install Command:** `npm install` (or `npm ci`)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

Detailed instructions are in [`docs/VERCEL_DEPLOYMENT.md`](docs/VERCEL_DEPLOYMENT.md).

## Environment variables

- Use [`web/.env.example`](web/.env.example) as the template for local and Vercel env setup.
- Configure the same environment variable set for both **Preview** and **Production** environments in Vercel.

## Local predeploy checks

From repo root, run one of:

- PowerShell: `./scripts/web_predeploy_check.ps1`
- Bash: `./scripts/web_predeploy_check.sh`

These run install + lint + typecheck + build for the Next.js app.
