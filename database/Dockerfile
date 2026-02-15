FROM ubuntu:latest

# Install PostgreSQL
RUN apt-get update && apt-get install -y \
    postgresql-15 \
    postgresql-contrib-15 \
    && rm -rf /var/lib/apt/lists/*

# Create data directory
RUN mkdir -p /var/lib/postgresql/data && \
    chown -R postgres:postgres /var/lib/postgresql

# Copy init script
COPY init.sql /docker-entrypoint-initdb.d/

USER postgres

EXPOSE 5432

CMD ["postgres", "-D", "/var/lib/postgresql/data"]
