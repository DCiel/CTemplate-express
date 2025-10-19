# Makefile для управления Docker контейнерами
.PHONY: help dev prod build up down logs clean migrate seed test

# Переменные
COMPOSE_PROJECT_NAME ?= common-express
DOCKER_COMPOSE = docker-compose
DOCKER_COMPOSE_DEV = docker-compose -f docker-compose.dev.yml
DOCKER_COMPOSE_PROD = docker-compose -f docker-compose.yml

# Цвета для вывода
GREEN = \033[0;32m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

help: ## Показать справку
	@echo "$(GREEN)Доступные команды:$(NC)"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# === РАЗРАБОТКА ===
dev: ## Запустить в режиме разработки с hot reload
	@echo "$(GREEN)Запуск в режиме разработки...$(NC)"
	$(DOCKER_COMPOSE_DEV) up --build

dev-detached: ## Запустить в режиме разработки в фоне
	@echo "$(GREEN)Запуск в режиме разработки в фоне...$(NC)"
	$(DOCKER_COMPOSE_DEV) up --build -d

dev-logs: ## Показать логи разработки
	$(DOCKER_COMPOSE_DEV) logs -f

dev-stop: ## Остановить контейнеры разработки
	@echo "$(YELLOW)Остановка контейнеров разработки...$(NC)"
	$(DOCKER_COMPOSE_DEV) down

# === ПРОДАКШН ===
prod: ## Запустить в продакшн режиме
	@echo "$(GREEN)Запуск в продакшн режиме...$(NC)"
	$(DOCKER_COMPOSE_PROD) up --build

prod-detached: ## Запустить в продакшн режиме в фоне
	@echo "$(GREEN)Запуск в продакшн режиме в фоне...$(NC)"
	$(DOCKER_COMPOSE_PROD) up --build -d

prod-logs: ## Показать логи продакшн
	$(DOCKER_COMPOSE_PROD) logs -f

prod-stop: ## Остановить контейнеры продакшн
	@echo "$(YELLOW)Остановка контейнеров продакшн...$(NC)"
	$(DOCKER_COMPOSE_PROD) down

# === СБОРКА ===
build: ## Собрать образы
	@echo "$(GREEN)Сборка образов...$(NC)"
	$(DOCKER_COMPOSE_PROD) build --no-cache

build-dev: ## Собрать образы для разработки
	@echo "$(GREEN)Сборка образов для разработки...$(NC)"
	$(DOCKER_COMPOSE_DEV) build --no-cache

# === УПРАВЛЕНИЕ ===
up: dev ## Алиас для dev

down: ## Остановить все контейнеры
	@echo "$(YELLOW)Остановка всех контейнеров...$(NC)"
	$(DOCKER_COMPOSE_DEV) down
	$(DOCKER_COMPOSE_PROD) down

restart: ## Перезапустить контейнеры разработки
	@echo "$(GREEN)Перезапуск контейнеров разработки...$(NC)"
	$(DOCKER_COMPOSE_DEV) restart

restart-app: ## Перезапустить только приложение
	@echo "$(GREEN)Перезапуск приложения...$(NC)"
	$(DOCKER_COMPOSE_DEV) restart app

# === ЛОГИ ===
logs: ## Показать логи разработки
	$(DOCKER_COMPOSE_DEV) logs -f

logs-app: ## Показать логи только приложения
	$(DOCKER_COMPOSE_DEV) logs -f app

logs-db: ## Показать логи базы данных
	$(DOCKER_COMPOSE_DEV) logs -f postgres

logs-redis: ## Показать логи Redis
	$(DOCKER_COMPOSE_DEV) logs -f redis

# === БАЗА ДАННЫХ ===
migrate: ## Выполнить миграции
	@echo "$(GREEN)Выполнение миграций...$(NC)"
	$(DOCKER_COMPOSE_DEV) exec app bunx prisma migrate dev

migrate-deploy: ## Развернуть миграции в продакшн
	@echo "$(GREEN)Развертывание миграций...$(NC)"
	$(DOCKER_COMPOSE_PROD) exec app bunx prisma migrate deploy

db-reset: ## Сбросить базу данных
	@echo "$(RED)Сброс базы данных...$(NC)"
	$(DOCKER_COMPOSE_DEV) exec app bunx prisma migrate reset --force

db-studio: ## Открыть Prisma Studio
	@echo "$(GREEN)Запуск Prisma Studio...$(NC)"
	$(DOCKER_COMPOSE_DEV) exec app bunx prisma studio

# === ОЧИСТКА ===
clean: ## Очистить все контейнеры, образы и volumes
	@echo "$(RED)Очистка всех контейнеров, образов и volumes...$(NC)"
	$(DOCKER_COMPOSE_DEV) down -v --rmi all
	$(DOCKER_COMPOSE_PROD) down -v --rmi all
	docker system prune -af
	docker volume prune -f

clean-volumes: ## Очистить только volumes
	@echo "$(YELLOW)Очистка volumes...$(NC)"
	$(DOCKER_COMPOSE_DEV) down -v
	$(DOCKER_COMPOSE_PROD) down -v
	docker volume prune -f

# === СТАТУС ===
status: ## Показать статус контейнеров
	@echo "$(GREEN)Статус контейнеров разработки:$(NC)"
	$(DOCKER_COMPOSE_DEV) ps
	@echo "$(GREEN)Статус контейнеров продакшн:$(NC)"
	$(DOCKER_COMPOSE_PROD) ps

# === SHELL ===
shell: ## Войти в контейнер приложения
	$(DOCKER_COMPOSE_DEV) exec app /bin/bash

shell-db: ## Войти в контейнер базы данных
	$(DOCKER_COMPOSE_DEV) exec postgres psql -U $(shell grep POSTGRES_USER .env | cut -d '=' -f2) -d $(shell grep POSTGRES_DB .env | cut -d '=' -f2)

# === ТЕСТИРОВАНИЕ ===
test: ## Запустить тесты
	@echo "$(GREEN)Запуск тестов...$(NC)"
	$(DOCKER_COMPOSE_DEV) exec app bun test

# === УСТАНОВКА ===
install: ## Установить зависимости локально
	@echo "$(GREEN)Установка зависимостей...$(NC)"
	bun install

# === ПО УМОЛЧАНИЮ ===
.DEFAULT_GOAL := help
