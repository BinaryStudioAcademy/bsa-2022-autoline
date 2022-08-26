FROM node:16.16.0-alpine as frontend-build
ARG VITE_API_ORIGIN_URL
ENV VITE_API_ORIGIN_URL=$VITE_API_ORIGIN_URL

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.yml ./
COPY ./shared ./shared/
COPY ./frontend ./frontend/
COPY ./frontend/package.json ./frontend/
COPY ./frontend/yarn.lock ./frontend/

RUN yarn install:shared && \
    yarn install:frontend && \
    yarn run build:shared && \
    yarn build:frontend

FROM nginx:1.22.0-alpine

COPY ./.docker/autoline/nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=frontend-build /app/frontend/dist/ /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
