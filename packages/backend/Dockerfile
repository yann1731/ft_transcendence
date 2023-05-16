FROM node:20-alpine3.17

RUN mkdir -p /serv/app \
    && npm i -g @nestjs/cli --silent

WORKDIR /serv/app

COPY ./app .

ENTRYPOINT [ "npm", "run", "start:dev"]