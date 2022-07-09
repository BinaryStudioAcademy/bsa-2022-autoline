import { AppEnvironment } from '@common/enums/app/app-environment.enum';

const {
  NODE_ENV,
  PORT,
  HOST,
  FRONTEND_URL,
  SECRET_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_PORT,
} = process.env;

const ENV = {
  APP: {
    NODE_ENV: <AppEnvironment>NODE_ENV,
    SERVER_PORT: Number(PORT),
    SERVER_HOST: HOST ?? 'http://localhost',
    FRONTEND_URL: FRONTEND_URL,
  },
  JWT: {
    SECRET: SECRET_KEY,
    EXPIRES_IN: '24h',
  },
  DB: {
    USER: DB_USER,
    PASSWORD: DB_PASSWORD,
    DATABASE: DB_DATABASE,
    HOST: DB_HOST,
    PORT: Number(DB_PORT),
  },
  API: {
    V1_PREFIX: '/api/v1',
  },
} as const;

export { ENV };
