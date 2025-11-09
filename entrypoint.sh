#!/bin/sh

echo "
#!/bin/sh
curl http://localhost:3333/api/run/recurring
" >/etc/periodic/hourly/recurring-invoices

chmod +x /etc/periodic/hourly/recurring-invoices

cd /app/backend/apps/backend || exit

export PORT=3333
export NODE_ENV=production

# wait for postgres to be ready
echo "waiting for postgres to be ready..."
until PGPASSWORD=$PG_PASSWORD psql -h "$PG_HOST" -U "$PG_USER" -d postgres -c '\q' 2>/dev/null; do
  echo "postgres is unavailable - sleeping"
  sleep 1
done
echo "postgres is ready"

# create database if it doesn't exist
echo "checking if database '$PG_DB_NAME' exists..."
DB_EXISTS=$(PGPASSWORD=$PG_PASSWORD psql -h "$PG_HOST" -U "$PG_USER" -d postgres -tAc -v dbname="$PG_DB_NAME" "SELECT 1 FROM pg_database WHERE datname=:'dbname'")
if [ "$DB_EXISTS" != "1" ]; then
  echo "creating database '$PG_DB_NAME'..."
  PGPASSWORD=$PG_PASSWORD psql -h "$PG_HOST" -U "$PG_USER" -d postgres -c "CREATE DATABASE $PG_DB_NAME"
  echo "database created successfully"
else
  echo "database already exists"
fi

node ace migration:run --force
node ace db:seed
node server.js &

cd /app/frontend || exit
PORT=3000 node ./server/index.mjs &

crond -f &

caddy run --config /app/Caddyfile
