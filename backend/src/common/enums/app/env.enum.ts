import { AppEnvironment } from '@common/enums/app/app-environment.enum';

const {
  NODE_ENV,
  PORT,
  HOST,
  FRONTEND_URL,
  DATABASE_URL,
  SECRET_KEY,
  SENTRY_DSN,
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
    REFRESH_EXPIRES_IN: '60d',
  },
  DB: {
    URL: DATABASE_URL,
  },
  API: {
    V1_PREFIX: '/api/v1',
  },
  SENTRY: {
    DSN: SENTRY_DSN,
  },
} as const;

export { ENV };
