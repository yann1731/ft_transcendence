FROM node:18-alpine3.17

RUN apk add postgresql-client
RUN apk add dumb-init

RUN mkdir -p /serv/backend
# RUN mkdir -p /serv
WORKDIR /serv/backend
RUN npm i -g @nestjs/cli --silent

COPY . .

ENTRYPOINT [ "dumb-init", "/bin/sh", "./script/dbstartup.sh"]
