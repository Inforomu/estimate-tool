CURRENT_DIR=$(patsubst %/,%,$(dir $(realpath $(firstword $(MAKEFILE_LIST)))))
ROOT_DIR=$(CURRENT_DIR)
CURRENT_USER=sudo #utilisateur admin server
DOCKER_NAME=frontend_dev_1 #défini le nom que tu souhaite
DOCKER_COMPOSE?=$(CURRENT_USER) docker-compose
DOCKER_EXEC_TOOLS_APP=$(CURRENT_USER) docker exec -it $(DOCKER_NAME) sh
NODE_UPDATE="npm install -g npm@latest" # ou spécifie la version que tu souhaite installer
NODE_INSTALL="npm i"
SERVER_RUN="npm run dev" # ta propre commande pour run

.PHONY: build install dev up start first stop restart clear ps

build:
	$(DOCKER_COMPOSE) up --build --no-recreate -d

install:
	$(DOCKER_EXEC_TOOLS_APP) -c $(NODE_INSTALL)

upgrade:
	$(DOCKER_EXEC_TOOLS_APP) -c $(NODE_UPDATE)

dev:
	$(DOCKER_EXEC_TOOLS_APP) -c $(SERVER_RUN)

up:
	$(DOCKER_COMPOSE) up

start: up dev

first: build upgrade install dev

stop: $(ROOT_DIR)/docker-compose.yml
	$(DOCKER_COMPOSE) kill || true
	$(DOCKER_COMPOSE) rm --force || true

restart: stop start dev

clear: stop $(ROOT_DIR)/docker-compose.yml
	$(DOCKER_COMPOSE) down -v --remove-orphans || true

ps:
	$(DOCKER_COMPOSE) -f docker-compose.yml ps