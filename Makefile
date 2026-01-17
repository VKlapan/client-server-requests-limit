.PHONY: up down restart logs clean help

help:
	@echo "Available commands:"
	@echo "  make up       - Build and start all Docker containers"
	@echo "  make down     - Stop and remove all Docker containers"
	@echo "  make restart  - Restart all containers"
	@echo "  make logs     - Show logs from all containers"
	@echo "  make clean    - Remove all containers, volumes, and networks"

up:
	docker-compose up -d --build

down:
	docker-compose down

restart:
	docker-compose restart

logs:
	docker-compose logs -f

clean:
	docker-compose down -v
