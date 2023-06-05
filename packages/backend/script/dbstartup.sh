#!/bin/sh

npx prisma migrate dev --name "init"

#to be removed later
npm run start:dev