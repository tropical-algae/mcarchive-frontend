FROM nginx:1.27-alpine-slim

WORKDIR /app

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist .
