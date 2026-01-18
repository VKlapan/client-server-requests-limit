.PHONY: up up-nest up-express down down-nest down-express restart restart-nest restart-express logs logs-nest logs-express clean clean-nest clean-express help

help:
	@echo "Available commands:"
	@echo ""
	@echo "NestJS Server:"
	@echo "  make up-nest      - Build and start NestJS stack (server + redis + client)"
	@echo "  make down-nest    - Stop NestJS stack"
	@echo "  make restart-nest - Restart NestJS containers"
	@echo "  make logs-nest    - Show NestJS stack logs"
	@echo "  make clean-nest   - Remove NestJS containers and volumes"
	@echo ""
	@echo "Express Server:"
	@echo "  make up-express      - Build and start Express stack (server + redis + client)"
	@echo "  make down-express    - Stop Express stack"
	@echo "  make restart-express - Restart Express containers"
	@echo "  make logs-express    - Show Express stack logs"
	@echo "  make clean-express   - Remove Express containers and volumes"
	@echo ""
	@echo "Shortcuts (default to NestJS):"
	@echo "  make up      - Same as make up-nest"
	@echo "  make down    - Same as make down-nest"
	@echo "  make restart - Same as make restart-nest"
	@echo "  make logs    - Same as make logs-nest"
	@echo "  make clean   - Same as make clean-nest"

# NestJS commands
up-nest:
	docker-compose -f docker-compose.nest.yml up -d --build

down-nest:
	docker-compose -f docker-compose.nest.yml down

restart-nest:
	docker-compose -f docker-compose.nest.yml restart

logs-nest:
	docker-compose -f docker-compose.nest.yml logs -f

clean-nest:
	docker-compose -f docker-compose.nest.yml down -v

# Express commands
up-express:
	docker-compose -f docker-compose.express.yml up -d --build

down-express:
	docker-compose -f docker-compose.express.yml down

restart-express:
	docker-compose -f docker-compose.express.yml restart

logs-express:
	docker-compose -f docker-compose.express.yml logs -f

clean-express:
	docker-compose -f docker-compose.express.yml down -v

# Defaults (NestJS)
up: up-nest

down: down-nest

restart: restart-nest

logs: logs-nest

clean: clean-nest
