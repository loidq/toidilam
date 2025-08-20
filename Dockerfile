# Base stage
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.12.4 --activate
WORKDIR /app

# Builder stage
FROM base AS builder

ARG ENV_FILE=.env.local

COPY package.json pnpm-lock.yaml ./

COPY ${ENV_FILE} .env

RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm prisma:generate && pnpm build

# Prune dev deps
RUN pnpm prune --prod

# Production stage
FROM base AS production

ARG ENV_FILE=.env.local

COPY ${ENV_FILE} .env

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/infrastructure/prisma/schema.prisma ./src/infrastructure/prisma/

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Non-root user
RUN addgroup -g 1001 -S nodejs \
 && adduser -S nestjs -u 1001 \
 && chown -R nestjs:nodejs /app
USER nestjs

EXPOSE 3000


ENTRYPOINT ["/app/entrypoint.sh"]
