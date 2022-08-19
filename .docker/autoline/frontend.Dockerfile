FROM node:16.16.0-alpine as frontend-build

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.yml ./
COPY ./shared ./shared/
COPY ./frontend/package.json ./frontend/

RUN yarn workspace @autoline/shared install
RUN yarn run build:shared

RUN yarn workspace @autoline/frontend install

COPY ./frontend ./frontend/

RUN yarn run build:frontend

FROM nginx:1.22.0-alpine

COPY ./.docker/autoline/nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=frontend-build /app/frontend/build/ /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
