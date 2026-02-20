#!/usr/bin/env pwsh
$ErrorActionPreference = 'Stop'

Set-Location "$PSScriptRoot/../web"

Write-Host '[web-predeploy] Running npm ci...'
try {
  npm ci
} catch {
  Write-Warning '[web-predeploy] npm ci failed; falling back to npm install'
  npm install
}

Write-Host '[web-predeploy] Running lint...'
npm run lint

Write-Host '[web-predeploy] Running typecheck...'
npm run typecheck

Write-Host '[web-predeploy] Running build...'
npm run build

Write-Host '[web-predeploy] All checks passed.'
