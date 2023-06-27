FROM node:20-alpine3.17

RUN apk add postgresql-client

RUN mkdir -p /serv/backend
# RUN mkdir -p /serv
WORKDIR /serv/backend
RUN npm i -g @nestjs/cli --silent


COPY . .

ENTRYPOINT [ "/bin/sh", "./script/dbstartup.sh"]
