FROM zenika/alpine-chrome 

USER root

RUN apk add --no-cache --update nodejs npm graphicsmagick ghostscript caddy

WORKDIR /app

RUN npm install -g pnpm
RUN mkdir -p /app/frontend
RUN mkdir -p /app/backend
COPY ./apps/frontend/.output /app/frontend
COPY ./apps/backend/build /app/backend
COPY ./Caddyfile .
COPY ./entrypoint.sh .
ENTRYPOINT ["./entrypoint.sh"]
