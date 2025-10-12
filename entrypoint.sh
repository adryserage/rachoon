#!/bin/sh

cd /app/backend || exit
pnpm install -P --frozen-lockfile --force
node ace migration:run --force
node ace db:seed
PORT=3333 node server.js &

cd /app/frontend || exit
PORT=3000 node ./server/index.mjs &

caddy run --config /app/Caddyfile
