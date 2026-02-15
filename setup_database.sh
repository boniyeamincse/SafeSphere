#!/bin/bash

# SafeSphere Database Setup Script
# This script sets up PostgreSQL database for SafeSphere

set -e

echo "========================================"
echo "SafeSphere Database Setup"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
DB_NAME="safesphere"
DB_USER="safesphere"
DB_PASSWORD="safesphere123"

echo -e "${YELLOW}Step 1: Checking PostgreSQL installation...${NC}"
if ! command -v psql &> /dev/null; then
    echo -e "${RED}PostgreSQL is not installed. Please install it first:${NC}"
    echo "  sudo apt-get update"
    echo "  sudo apt-get install postgresql postgresql-contrib"
    exit 1
fi
echo -e "${GREEN}✓ PostgreSQL is installed${NC}"
echo ""

echo -e "${YELLOW}Step 2: Starting PostgreSQL service...${NC}"
sudo systemctl start postgresql || true
sudo systemctl enable postgresql || true
sleep 2
echo -e "${GREEN}✓ PostgreSQL service started${NC}"
echo ""

echo -e "${YELLOW}Step 3: Creating database and user...${NC}"

# Create database user
sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';" 2>/dev/null || echo "User already exists"

# Create database
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;" 2>/dev/null || echo "Database already exists"

# Grant privileges
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
sudo -u postgres psql -c "ALTER USER $DB_USER CREATEDB;"

echo -e "${GREEN}✓ Database and user created${NC}"
echo ""

echo -e "${YELLOW}Step 4: Running database migrations...${NC}"
cd backend
source venv/bin/activate 2>/dev/null || {
    echo -e "${RED}Virtual environment not found. Creating it...${NC}"
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
}

# Run Alembic migrations if they exist
if [ -d "alembic" ]; then
    alembic upgrade head
else
    echo "No migrations found, creating tables from models..."
    python -c "from app.database import Base, engine; import asyncio; asyncio.run(Base.metadata.create_all(bind=engine))" 2>/dev/null || echo "Tables might already exist"
fi

echo -e "${GREEN}✓ Database schema created${NC}"
echo ""

echo -e "${YELLOW}Step 5: Creating default admin user...${NC}"
cd ..
PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -d $DB_NAME -f backend/create_admin.sql

echo -e "${GREEN}✓ Admin user created${NC}"
echo ""

echo "========================================"
echo -e "${GREEN}Setup Complete!${NC}"
echo "========================================"
echo ""
echo "Database Configuration:"
echo "  Host: localhost"
echo "  Port: 5432"
echo "  Database: $DB_NAME"
echo "  User: $DB_USER"
echo "  Password: $DB_PASSWORD"
echo ""
echo "Default Admin Credentials:"
echo -e "  ${GREEN}Email: admin@safesphere.local${NC}"
echo -e "  ${GREEN}Password: admin${NC}"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT: Change the admin password after first login!${NC}"
echo ""
echo "To start the application:"
echo "  1. Backend: cd backend && source venv/bin/activate && uvicorn app.main:app --reload"
echo "  2. Frontend: cd frontend && npm run dev"
echo "  3. Open: http://localhost:5173"
echo ""
