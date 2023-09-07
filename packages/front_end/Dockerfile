FROM node:18-alpine3.17

RUN apk add dumb-init

WORKDIR /app

COPY . .

RUN yarn install

CMD [ "dumb-init", "yarn", "start"]

