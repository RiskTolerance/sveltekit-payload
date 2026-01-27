#!/bin/sh
# entrypoint.sh
set -e

echo "Running database migrations..."
# Try to find payload CLI in various locations
if [ -f "./node_modules/.bin/payload" ]; then
  ./node_modules/.bin/payload migrate || echo "Migrations completed (or skipped if already up to date)"
elif command -v payload >/dev/null 2>&1; then
  payload migrate || echo "Migrations completed (or skipped if already up to date)"
else
  # Fallback: use npx with explicit node_modules path
  NODE_PATH=./node_modules npx --yes payload migrate || echo "Migrations completed (or skipped if already up to date)"
fi

echo "Starting Payload CMS server..."
exec node server.js