FROM node:16.16.0-slim as backend-build

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.yml ./
COPY ./shared ./shared/
COPY ./backend ./backend

RUN yarn install:shared && \
    yarn install:backend && \
    yarn run build:shared:be && \
    yarn run build:backend && \
    yarn cd backned && db:migrate:prod && \
    rm -rf ./backend/src && \
    rm -rf ./shared/src

EXPOSE 3001
CMD ["node", "./backend/build/src/server.js"]
