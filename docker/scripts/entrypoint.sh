#!/bin/bash
set -e

echo "=========================================="
echo "SafeSphere Container Starting..."
echo "=========================================="

# Create log directory
mkdir -p /var/log/supervisor

# Start PostgreSQL temporarily to initialize database
echo "Initializing PostgreSQL..."
su - postgres -c "/usr/lib/postgresql/15/bin/pg_ctl -D /var/lib/postgresql/data -l /var/log/postgresql.log start"

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until su - postgres -c "psql -c '\q'" 2>/dev/null; do
  sleep 1
done

# Create database and user if not exists
echo "Setting up database..."
su - postgres -c "psql -c \"CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';\" 2>/dev/null || true"
su - postgres -c "psql -c \"CREATE DATABASE $POSTGRES_DB OWNER $POSTGRES_USER;\" 2>/dev/null || true"
su - postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;\" 2>/dev/null || true"

# Run init script if exists
if [ -f /docker-entrypoint-initdb.d/init.sql ]; then
    echo "Running database initialization script..."
    su - postgres -c "psql -d $POSTGRES_DB -f /docker-entrypoint-initdb.d/init.sql" 2>/dev/null || true
fi

# Stop PostgreSQL (supervisor will restart it)
echo "Stopping temporary PostgreSQL instance..."
su - postgres -c "/usr/lib/postgresql/15/bin/pg_ctl -D /var/lib/postgresql/data stop"

echo "=========================================="
echo "Starting all services via Supervisor..."
echo "=========================================="

# Start supervisor
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
