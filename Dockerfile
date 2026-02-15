FROM ubuntu:latest

# Metadata
LABEL maintainer="SafeSphere Team"
LABEL description="SafeSphere - All-in-One Security Awareness Platform"
LABEL version="1.0"

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONUNBUFFERED=1 \
    NODE_ENV=production \
    DATABASE_URL=postgresql://safesphere:safesphere@localhost:5432/safesphere \
    POSTGRES_USER=safesphere \
    POSTGRES_PASSWORD=safesphere \
    POSTGRES_DB=safesphere

WORKDIR /app

# ============================================
# STAGE 1: Install System Dependencies
# ============================================
RUN apt-get update && apt-get install -y \
    # Python dependencies
    python3 \
    python3-pip \
    python3-venv \
    # Node.js dependencies
    curl \
    gnupg \
    # PostgreSQL
    postgresql-15 \
    postgresql-contrib-15 \
    # Process manager
    supervisor \
    # Cleanup
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ============================================
# STAGE 2: Setup PostgreSQL
# ============================================
RUN mkdir -p /var/lib/postgresql/data /var/run/postgresql && \
    chown -R postgres:postgres /var/lib/postgresql /var/run/postgresql && \
    chmod 755 /var/run/postgresql && \
    su - postgres -c "/usr/lib/postgresql/15/bin/initdb -D /var/lib/postgresql/data" && \
    echo "host all all 0.0.0.0/0 md5" >> /var/lib/postgresql/data/pg_hba.conf && \
    echo "listen_addresses='*'" >> /var/lib/postgresql/data/postgresql.conf

# ============================================
# STAGE 3: Build Frontend
# ============================================
COPY frontend/package*.json /app/frontend/
WORKDIR /app/frontend
RUN npm ci --only=production

COPY frontend /app/frontend
RUN npm run build && \
    rm -rf node_modules src public && \
    npm cache clean --force

# ============================================
# STAGE 4: Setup Backend
# ============================================
WORKDIR /app/backend
COPY backend/requirements.txt /app/backend/
RUN pip3 install --no-cache-dir -r requirements.txt

COPY backend /app/backend

# ============================================
# STAGE 5: Setup Database Init Scripts
# ============================================
COPY database/init.sql /docker-entrypoint-initdb.d/init.sql

# ============================================
# STAGE 6: Configure Supervisor
# ============================================
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/scripts/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# ============================================
# STAGE 7: Health Check & Expose Port
# ============================================
EXPOSE 8001

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:8001/ || exit 1

# Set working directory
WORKDIR /app

# Run entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]
