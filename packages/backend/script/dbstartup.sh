#!/bin/bash

npm install

until PGPASSWORD=$POSTGRES_PASSWORD psql -h database -p 5432 -U puser -d transcendance -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

npx prisma migrate dev --name "init"

>&2 echo "Postgres is up - executing command"

npm run start:dev


#!/bin/sh

# npx prisma migrate dev --name "init"

#to be removed later
# npm run start:dev

# /bin/sh