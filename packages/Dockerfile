FROM node:18-alpine3.17

RUN apk add postgresql-client

RUN npm i -g @nestjs/cli --silent

WORKDIR /application/

RUN mkdir -p backend

RUN mkdir -p frontend

COPY ./backend ./backend

WORKDIR /application/

COPY  ./front_end ./frontend

WORKDIR /application/frontend

RUN yarn install

RUN yarn build

RUN mv ./build ../backend/

WORKDIR /application/backend

ENTRYPOINT [ "/bin/sh", "./script/dbstartup.sh"]