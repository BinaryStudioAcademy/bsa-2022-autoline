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

RUN yarn install:shared
RUN yarn install:backend

RUN yarn run build:shared
RUN yarn run build:backend

RUN rm -rf ./backend/src
RUN rm -rf ./shared/src

EXPOSE 3001
CMD yarn run start:dev
