FROM node:20-alpine3.17

RUN mkdir -p /serv/app
WORKDIR /serv/app
RUN npm i -g @nestjs/cli --silent

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run", "start:dev"]
