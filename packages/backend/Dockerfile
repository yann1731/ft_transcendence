FROM node:20-alpine3.17

RUN mkdir -p /serv/backend
# RUN mkdir -p /serv
WORKDIR /serv/backend
RUN npm i -g @nestjs/cli --silent

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

# ENTRYPOINT [ "npm", "run", "start:dev"]
ENTRYPOINT [ "/bin/sh", "./script/dbstartup.sh" ]
# ENTRYPOINT [ "/bin/sh" ]
