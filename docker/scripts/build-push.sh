#!/bin/bash

# Configuration
DOCKER_USERNAME="${DOCKER_USERNAME:-yourusername}"
IMAGE_NAME="safesphere"
VERSION="${VERSION:-latest}"

echo "=========================================="
echo "Building SafeSphere Docker Image"
echo "=========================================="

# Build image
docker build -t ${IMAGE_NAME}:${VERSION} .

if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

echo "=========================================="
echo "Tagging image for Docker Hub"
echo "=========================================="

# Tag for Docker Hub
docker tag ${IMAGE_NAME}:${VERSION} ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}
docker tag ${IMAGE_NAME}:${VERSION} ${DOCKER_USERNAME}/${IMAGE_NAME}:latest

echo "=========================================="
echo "Pushing to Docker Hub"
echo "=========================================="

# Push to Docker Hub
docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}
docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:latest

echo "=========================================="
echo "Done! Image available at:"
echo "${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}"
echo "${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
echo "=========================================="
