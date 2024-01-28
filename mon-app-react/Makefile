# Nom de l'image Docker
IMAGE_NAME := mon-application-react

# Nom du conteneur Docker
CONTAINER_NAME := mon-app-react

# Port de l'hôte mappé au port du conteneur
PORTS := -p 8080:3000

# Toutes les cibles
all: build run list-images

build:
	docker build -t $(IMAGE_NAME) .

run: remove-container
	docker run $(PORTS) --name $(CONTAINER_NAME) $(IMAGE_NAME)

list-images:
	docker images

stop:
	docker stop $(CONTAINER_NAME)

remove-container:
	-docker rm -f $(CONTAINER_NAME)

rebuild: stop build run list-images

.PHONY: build run list-images stop remove-container rebuild all
