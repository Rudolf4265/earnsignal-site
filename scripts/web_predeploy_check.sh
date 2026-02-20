#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../web"

echo "[web-predeploy] Running npm ci..."
if ! npm ci; then
  echo "[web-predeploy] npm ci failed; falling back to npm install"
  npm install
fi

echo "[web-predeploy] Running lint..."
npm run lint

echo "[web-predeploy] Running typecheck..."
npm run typecheck

echo "[web-predeploy] Running build..."
npm run build

echo "[web-predeploy] All checks passed."
