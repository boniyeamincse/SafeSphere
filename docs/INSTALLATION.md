# SafeSphere Installation Guide

This guide provides detailed instructions for installing SafeSphere in different environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Docker Installation](#docker-installation)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements

- **Operating System**: Linux, macOS, or Windows 10/11
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: 2GB free space

### Required Software

1. **Node.js** (v18.0.0 or higher)
   ```bash
   # Check version
   node --version
   npm --version
   ```

2. **Python** (v3.9 or higher)
   ```bash
   # Check version
   python --version
   pip --version
   ```

3. **PostgreSQL** (v13 or higher)
   ```bash
   # Check version
   psql --version
   ```

4. **Git**
   ```bash
   # Check version
   git --version
   ```

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/boniyeamincse/SafeSphere.git
cd SafeSphere
```

### 2. Backend Setup

#### Create Virtual Environment

```bash
cd backend
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/safesphere

# JWT Configuration
SECRET_KEY=your-secret-key-here-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Settings
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

#### Initialize Database

```bash
# Create database
createdb safesphere

# Run migrations (if using Alembic)
alembic upgrade head
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:8000
```

### 4. Run the Application

#### Terminal 1 - Backend

```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at:
- API: http://localhost:8000
- API Docs: http://localhost:8000/docs

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

Frontend will be available at:
- Application: http://localhost:5173

## Docker Installation

### Prerequisites

- Docker Desktop installed
- Docker Compose installed

### Quick Start with Docker

```bash
# Build and run all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Docker Services

The `docker-compose.yml` file defines:
- **frontend**: React application (port 3000)
- **backend**: FastAPI application (port 8000)
- **database**: PostgreSQL database (port 5432)

### Accessing the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Database: localhost:5432

## Production Deployment

### Environment Setup

1. **Update environment variables** for production
2. **Set strong SECRET_KEY**
3. **Configure production database**
4. **Set up HTTPS/SSL certificates**
5. **Configure CORS appropriately**

### Backend Deployment

```bash
# Install production dependencies
pip install -r requirements.txt

# Run with production server
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
```

### Frontend Deployment

```bash
# Build for production
npm run build

# Serve static files with nginx or similar
```

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name safesphere.yourdomain.com;

    location / {
        root /var/www/safesphere/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Troubleshooting

### Database Connection Issues

**Problem**: Cannot connect to PostgreSQL

**Solution**:
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql

# Verify connection
psql -U postgres -h localhost
```

### Port Already in Use

**Problem**: Port 8000 or 5173 already in use

**Solution**:
```bash
# Find process using port
lsof -i :8000

# Kill process
kill -9 <PID>
```

### Frontend Build Errors

**Problem**: npm install fails

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Python Dependencies Issues

**Problem**: pip install fails

**Solution**:
```bash
# Upgrade pip
pip install --upgrade pip

# Install with verbose output
pip install -r requirements.txt -v
```

## Additional Resources

- [User Guide](./USER_GUIDE.md)
- [API Documentation](./API.md)
- [Development Guide](./DEVELOPMENT.md)
- [GitHub Issues](https://github.com/boniyeamincse/SafeSphere/issues)

## Support

For installation support:
- Open an issue on GitHub
- Email: support@safesphere.dev

---

✅ **Installation complete!** You're ready to start using SafeSphere.
