FROM node:20-alpine3.17

RUN mkdir -p /serv/app

WORKDIR /serv/app

COPY ./app .

RUN npm install

ENTRYPOINT ["/bin/ash"]