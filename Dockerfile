# Многоступенчатая сборка с кэшированием
FROM oven/bun:1 as base

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей для кэширования
COPY package.json bun.lock ./

# Устанавливаем зависимости с кэшированием
RUN --mount=type=cache,id=bun,target=/root/.bun/install/cache \
    bun install --frozen-lockfile --production

# Копируем исходный код
COPY . .

# Генерируем Prisma клиент с кэшированием
RUN --mount=type=cache,id=prisma,target=/root/.cache/prisma \
    bunx prisma generate --schema=./src/database/prisma/schema.prisma

# Production образ
FROM oven/bun:1-slim

# Устанавливаем OpenSSL для Prisma
RUN --mount=type=cache,id=apt,target=/var/cache/apt \
    apt-get update -y && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

# Создаем пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 bun

# Создание директорий с правильными правами
RUN mkdir -p /app /app/logs && \
    chown bun:nodejs /app /app/logs

WORKDIR /app

# Переключение на пользователя bun
USER bun

# Копируем зависимости и исходный код
COPY --from=base --chown=bun:nodejs /app/node_modules ./node_modules
COPY --from=base --chown=bun:nodejs /app/package.json ./
COPY --from=base --chown=bun:nodejs /app/bun.lock ./
COPY --from=base --chown=bun:nodejs /app/src ./src
COPY --from=base --chown=bun:nodejs /app/tsconfig.json ./
COPY --from=base --chown=bun:nodejs /app/node_modules/.prisma ./node_modules/.prisma

# Открываем порт
EXPOSE 4000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:4000/health || exit 1

# Запускаем приложение
CMD ["bun", "run", "start"]