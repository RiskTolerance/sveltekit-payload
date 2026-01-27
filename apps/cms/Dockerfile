FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
RUN apk add --no-cache wget
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public


RUN mkdir .next
RUN chown nextjs:nodejs .next

RUN mkdir -p /app/media && chown nextjs:nodejs /app/media

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Ensure payload CLI is available for migrations
# Copy payload package from builder to ensure migrations can run
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/payload ./node_modules/payload/
# Create symlink for payload CLI binary
RUN mkdir -p ./node_modules/.bin && \
    ln -sf ../payload/dist/bin/cli.js ./node_modules/.bin/payload || true

# Copy payload config and package.json for migrations
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Copy entrypoint script
COPY --chown=nextjs:nodejs entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["./entrypoint.sh"]