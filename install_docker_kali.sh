#!/bin/bash
set -e

echo "Installing Docker and Docker Compose for Kali Linux..."

# Update package database
sudo apt-get update

# Install Docker Engine
sudo apt-get install -y docker.io

# Install Docker Compose Plugin
sudo apt-get install -y docker-compose-plugin

# If the plugin isn't available, try the standalone (legacy but often present)
# sudo apt-get install -y docker-compose

# Start and enable Docker service
sudo systemctl enable --now docker

# Add current user to the docker group to run without sudo
sudo usermod -aG docker $USER

echo "------------------------------------------------------------------"
echo "Installation complete!"
echo "Docker version: $(docker --version)"
echo "Docker Compose version: $(docker compose version || docker-compose --version)"
echo "------------------------------------------------------------------"
echo "IMPORTANT: You must log out and log back in (or restart) for the group changes to take effect."
echo "           After that, you can run 'docker run hello-world' to verify."
