#!/bin/bash
set -e

echo "Fixing Docker sources and installing..."

# 1. Remove the bad docker repository if it exists
# We will use a safe approach to comment it out or remove the specific file
if [ -f /etc/apt/sources.list.d/docker.list ]; then
    echo "removing /etc/apt/sources.list.d/docker.list"
    sudo rm /etc/apt/sources.list.d/docker.list
fi

# Also check main sources.list just in case, though usually it's in a separate file.
# We won't touch sources.list automatically to be safe, but we'll assume the grep found it in a .list file.

# 2. Update package database
echo "Updating apt..."
sudo apt-get update

# 3. Install Docker from Kali's official repos (docker.io)
echo "Installing docker.io and docker-compose-plugin..."
sudo apt-get install -y docker.io docker-compose-plugin

# 4. Enable Service
sudo systemctl enable --now docker

# 5. Add user to group
sudo usermod -aG docker $USER

echo "------------------------------------------------------------------"
echo "Installation complete!"
echo "You might need to log out and log back in."
