import { AppEnvironment } from '@common/enums/app/app-environment.enum';

const {
  NODE_ENV,
  PORT,
  HOST,
  FRONTEND_URL,
  DATABASE_URL,
  SECRET_KEY,
  SENTRY_DSN,
  EMAIL_HOST,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  FROM_EMAIL,
  FROM_EMAIL_VALIDATE,
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
  MAILTRAP: {
    EMAIL_HOST: EMAIL_HOST,
    EMAIL_USERNAME: EMAIL_USERNAME,
    EMAIL_PASSWORD: EMAIL_PASSWORD,
    FROM_EMAIL: FROM_EMAIL,
  },
  SENTRY: {
    DSN: SENTRY_DSN,
  },
  MAIL: {
    ACTIVATE_URL: 'http://localhost:3001/api/v1/activate/',
    SUCCESS_URL: '/mail-activate-success',
    FAILED_URL: '/mail-activate-failed',
    NOT_ALLOWED_SEND_MAIL: '/mail-not-allowed',
    FROM_EMAIL_VALIDATE: FROM_EMAIL_VALIDATE,
  },
} as const;

export { ENV };
