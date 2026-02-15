#!/bin/bash

echo "=========================================="
echo "SafeSphere - GitHub Push"
echo "=========================================="

# Check if git is configured
if ! git config user.name > /dev/null; then
    echo "Setting up git config..."
    git config user.name "boniyeamincse"
    git config user.email "your-email@example.com"
fi

# Push to GitHub
echo "Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "=========================================="
    echo "✅ Successfully pushed to GitHub!"
    echo "Repository: https://github.com/boniyeamincse/SafeSphere"
    echo "=========================================="
else
    echo "=========================================="
    echo "❌ Push failed. Please run manually:"
    echo "git push origin main"
    echo ""
    echo "If authentication fails, use:"
    echo "git push https://YOUR_TOKEN@github.com/boniyeamincse/SafeSphere.git main"
    echo "=========================================="
fi
