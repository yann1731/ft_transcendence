#!/bin/sh

echo "Running script..."

npm install

until PGPASSWORD=$POSTGRES_PASSWORD psql -h database -p 5432 -U puser -d transcendance -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "Running prisma migrate..."
npx prisma migrate dev --name "init"
echo "Prisma migrate done..."

# >&2 echo "Postgres is up - executing command"

echo "Running npm run start:dev..."
npm run start:dev