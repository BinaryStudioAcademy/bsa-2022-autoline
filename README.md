# Autoline

**Autoline** is a multifunctional automobile-centric service. It allows searching by filters, detailed comparing,
and reviewing, but also it picks up the available options on the market to choose the best price.

## Table of contents

[1. Introduction](#1-Introduction)

&nbsp;&nbsp;[1.1 Useful Links](#11-useful-links)

[2. Domain](#2-Domain)

[3. Database Schema](#3-Database-Schema)

[4. Architecture](#4-Architecture)

&nbsp;&nbsp;[4.1 Global](#41-Global)

&nbsp;&nbsp;&nbsp;&nbsp;[4.1.1 Technologies](#411-Technologies)

&nbsp;&nbsp;[4.2 Frontend](#42-Frontend)

&nbsp;&nbsp;&nbsp;&nbsp;[4.2.1 Directory Structure](#421-Directory-Structure)

&nbsp;&nbsp;[4.3 Backend](#43-Backend)

&nbsp;&nbsp;&nbsp;&nbsp;[4.3.1 Directory Structure](#431-Directory-Structure)

&nbsp;&nbsp;[4.4 Shared Package](#44-Shared-Package)

&nbsp;&nbsp;&nbsp;&nbsp;[4.4.1 Reason](#431-Reason)

[5. How to Run](#5-How-to-Run)

&nbsp;&nbsp;[5.1 In Docker](#51-In-Docker)

&nbsp;&nbsp;[5.2 Manually](#52-Manually)

[6. Deployment](#6-Deployment)

## 1. Introduction<a id="1-Introduction"></a>

### 1.1 Useful Links<a id="11-useful-links"></a>

- Pay attention, that we have
  certain [quality criteria](https://github.com/BinaryStudioAcademy/quality-criteria/blob/production/source/javascript.md)
  , which we should follow during application development.

- [Production deployment](https://auto.ria.com/uk/)

## 2. Domain<a id="2-Domain"></a>

Our task is to help the buyer quickly and conveniently find the best offer auto offer.
For those who are determined by the choice, in each section,
there is a selection by parameters and an opportunity to compare products with each other.
Available and convenient text search allows users to search both the desired sections and specific products by name.
And on the page of each model, there is detailed information that will help you make a decision:
description, technical characteristics, photos and videos, useful links, and reviews.
There is also a block "Where to buy?" with a list of online stores, prices, and direct links to the purchase page.

## 3. Database Schema<a id="3-Database-Schema"></a>

To store that data we use the **`MariaDB`**, community-developed, commercially supported fork of the **`MySQL`**.

Diagram - https://dbdiagram.io/d/62e95fbbf31da965e865f0c9

1. Data is stored in a few schemas - `public`, `cars`, and `locations`.
2. Tables are named in the **snake_case** and the **plural** form.

## 4. Architecture<a id="#4-Architecture"></a>

### 4.1 Global<a id="#41-Global"></a>

#### 4.1.1 Technologies<a id="#411-Technologies"></a>

1. [Typescript](https://www.typescriptlang.org/)
2. [NodeJS 17](https://nodejs.dev/)
3. [Express](https://expressjs.com/)
4. [MariaDB](https://mariadb.org/)
5. [Prisma ORM](https://www.prisma.io/)
6. [Passport](https://www.passportjs.org/) + various auth strategies
7. [React 18](https://reactjs.org/)
8. [Vite](https://vitejs.dev/)
9. [Redux Toolkit](https://vitejs.dev/)
10. [Redux Persist](https://www.npmjs.com/package/redux-persist)
11. [MUI](https://mui.com/)
12. [Docker](https://www.docker.com/)
13. [Docker-Compose](https://docs.docker.com/compose/)
14. [nginx](https://www.nginx.com/)
15. [Github Actions](https://github.com/features/actions)

### 4.2 Frontend

#### 4.2.1 Directory Structure

1. assets - static assets (images, global styles)
2. common - common/shared files (types, enums)
3. components - plain react components
4. exceptions
5. helpers
6. services - api accessing services
7. store - redux store with all features as sub directorys
8. validation-schemas - schemas that used for forms validation

### 4.3 Backend

#### 4.3.1 Directory Structure

1. routes - rest endpoints paths definitions. **_There should be no domain logic_**
2. controllers - rest endpoints. **_There should be no domain logic_**
3. services - domain logic and implementation for the rest controllers
4. data - everything related to data access (migrations, models, repositories)
5. helpers
6. common - common/shared files (types, enums)
7. exceptions
8. validation-schemas - schemas that used for input data validation

### 4.4 Shared Package

#### 4.4.1 Reason

As we are already using js on both frontend and backend it would be useful to share some contracts and code between them.

## 5. How to Run

### 5.1 In Docker (preferred)

1. Create and fill all `.env` files. These files are:

- `.env/frontend.env`
- `.env/backend.env`

You should use `.env.example` directory as a reference and consult coaches or colleagues for the secret keys

2. Install dependencies (`node_modules`). Run `yarn install:all` in the root folder.

3. Run `docker-compose`: `cd .docker/autoline && docker-compose -f docker-compose.dev.yml up --build`

4. [Let's go!](https://youtu.be/Jo6fKboqfMs?t=24)

### 5.2 Manually

1. Create and fill all `.env` files. These files are:

- `.env/frontend.env`
- `.env/backend.env`

You should use `.env.example` directory as a reference and consult coaches or colleagues for the secret keys

2. Install dependencies (`node_modules`). Run `yarn install:all` in the root folder.

3. Run the database. You can either run it in docker using command `cd ./docker/autoline && docker-compose -f docker-compose.services.yml up --build` or by installing `Mariadb` on your computer. Docker variant is preferred.

4. Apply migrations: `cd backend && yarn db:migrate:dev`

5. Run shared: `cd shared && yarn start:dev`

6. Run backend: `cd backend && yarn start:dev`

7. Run frontend: `cd frontend && yarn start:dev`
