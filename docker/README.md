# SafeSphere Docker Setup

## 📦 Single Container Architecture

All services run in one container on **port 8001**:
- PostgreSQL 15 (internal)
- FastAPI Backend
- React Frontend (built & served)

## 🚀 Quick Start

### Using Docker Compose (Recommended)
```bash
docker-compose up -d
```

### Using Docker Run
```bash
docker run -d -p 8001:8001 --name safesphere safesphere:latest
```

### Pull from Docker Hub
```bash
docker pull yourusername/safesphere:latest
docker run -d -p 8001:8001 yourusername/safesphere:latest
```

## 🔨 Build & Push to Docker Hub

1. **Set your Docker Hub username:**
   ```bash
   export DOCKER_USERNAME=yourusername
   ```

2. **Login to Docker Hub:**
   ```bash
   docker login
   ```

3. **Build and push:**
   ```bash
   chmod +x docker/scripts/build-push.sh
   ./docker/scripts/build-push.sh
   ```

## 🌐 Access Application

- **Frontend:** http://localhost:8001
- **Backend API:** http://localhost:8001/docs
- **Health Check:** http://localhost:8001/

## 📁 Project Structure

```
SafeSphere/
├── Dockerfile                      # Main Dockerfile
├── docker-compose.yml              # Docker Compose config
├── .dockerignore                   # Exclude files from build
├── docker/
│   ├── supervisord.conf           # Process manager config
│   └── scripts/
│       ├── entrypoint.sh          # Container startup script
│       └── build-push.sh          # Build & push script
├── backend/                        # FastAPI application
├── frontend/                       # React application
└── database/                       # PostgreSQL init scripts
```

## 🔧 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql://safesphere:safesphere@localhost:5432/safesphere` | Database connection |
| `POSTGRES_USER` | `safesphere` | Database user |
| `POSTGRES_PASSWORD` | `safesphere` | Database password |
| `POSTGRES_DB` | `safesphere` | Database name |
| `JWT_SECRET` | `supersecretkey` | JWT secret key |

## 📊 Container Management

```bash
# View logs
docker logs safesphere

# Stop container
docker stop safesphere

# Remove container
docker rm safesphere

# Rebuild
docker-compose up --build
```
