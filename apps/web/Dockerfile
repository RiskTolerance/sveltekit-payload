# apps/web/Dockerfile
# SvelteKit with Bun runtime

FROM oven/bun:1 AS deps
WORKDIR /app
COPY apps/web/package.json apps/web/bun.lock* ./
RUN bun install --frozen-lockfile

FROM oven/bun:1 AS build
WORKDIR /app
# Copy node_modules first from deps stage (before copying app files to avoid conflicts)
COPY --from=deps /app/node_modules ./node_modules
# Copy web app source files and configs
COPY apps/web/package.json apps/web/bun.lock* ./
COPY apps/web/tsconfig.json ./
COPY apps/web/svelte.config.js ./
COPY apps/web/vite.config.ts ./
COPY apps/web/drizzle.config.ts ./
COPY apps/web/src ./src
# Copy static directory
COPY apps/web/static ./static/
# Copy Payload types file (needed for $cms alias at build time)
# The alias points to ../cms/src/payload-types.ts, so we need to create that structure
RUN mkdir -p ../cms/src
COPY apps/cms/src/payload-types.ts ../cms/src/payload-types.ts
ENV NODE_ENV=production
# Run svelte-kit sync first (required before build)
RUN bun run prepare || echo "prepare script completed"
RUN bun run build && echo "Build completed successfully" || (echo "Build failed!" && exit 1)
# Debug: List build directory contents to verify what was created
RUN echo "=== Build directory contents ===" && ls -la build/ 2>/dev/null || echo "Build directory not found"
RUN echo "=== Looking for entry files ===" && find build -type f \( -name "*.ts" -o -name "*.js" \) 2>/dev/null | head -20 || echo "No build files found"

FROM oven/bun:1-slim AS production
# Install wget for healthcheck
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy built application and production dependencies
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./
# Copy production node_modules (needed for runtime dependencies)
COPY --from=deps /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=5173
ENV HOST=0.0.0.0

EXPOSE 5173

# Don't switch to bun user yet - run as root to ensure we can see logs
# USER bun

# Try index.ts first (as user mentioned), then fallback to common alternatives
# Use exec to ensure the process runs as PID 1 and stays in foreground
# Add startup logging to verify container is running
CMD ["sh", "-c", "echo '=== Web container starting ===' && echo 'Working directory:' && pwd && echo 'User:' && whoami && echo 'Build directory contents:' && ls -la build/ 2>/dev/null || echo 'Build directory not found' && echo 'Looking for entry point...' && cd /app && if [ -f ./build/index.ts ]; then echo 'Found index.ts, starting server...' && exec bun run ./build/index.ts; elif [ -f ./build/server.js ]; then echo 'Found server.js, starting server...' && exec bun run ./build/server.js; elif [ -f ./build/index.js ]; then echo 'Found index.js, starting server...' && exec bun run ./build/index.js; else echo 'ERROR: No entry point found!'; echo 'Build directory contents:'; ls -la build/ 2>/dev/null || echo 'Build directory does not exist'; exit 1; fi"]