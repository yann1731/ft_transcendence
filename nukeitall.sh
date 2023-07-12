#!/bin/sh

docker compose down -v && docker system prune -a -f && docker volume prune -a -f

cd packages/backend && rm -rf dist/ node_modules/ prisma/migrations package-lock.json