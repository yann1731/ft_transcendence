FROM node:18-alpine3.17

RUN apk add dumb-init

WORKDIR /app

COPY . .

RUN yarn install

ENV WDS_SOCKET_PORT=3000

CMD [ "dumb-init", "yarn", "start"]

