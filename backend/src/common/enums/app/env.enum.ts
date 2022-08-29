import { AppEnvironment } from '@common/enums/app/app-environment.enum';

const {
  NODE_ENV,
  PORT,
  HOST,
  FRONTEND_URL,
  DATABASE_URL,
  SECRET_KEY,
  SENTRY_DSN,
  AUTORIA_API_KEY,
  EMAIL_HOST,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  FROM_EMAIL,
  FROM_MAIL_VALIDATE,
  EMAIL_PORT,
  FACEBOOK_APP_ID,
  FACEBOOK_SECRET_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env;

const ENV = {
  APP: {
    NODE_ENV: <AppEnvironment>NODE_ENV,
    SERVER_PORT: Number(PORT),
    SERVER_HOST: HOST ?? 'localhost',
    FRONTEND_URL: FRONTEND_URL,
    AUTORIA_API_KEY: AUTORIA_API_KEY,
  },
  JWT: {
    SECRET: SECRET_KEY || '',
    EXPIRES_IN: '24h',
    REFRESH_EXPIRES_IN: '60d',
  },
  DB: {
    URL: DATABASE_URL,
  },
  API: {
    V1_PREFIX: '/api/v1',
    AUTORIA_API_KEY: AUTORIA_API_KEY,
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
    FROM_EMAIL_VALIDATE: FROM_MAIL_VALIDATE,
    PORT_MAIL_SEND_SERVICE: EMAIL_PORT,
  },
  FACEBOOK: {
    APP_ID: FACEBOOK_APP_ID,
    SECRET_KEY: FACEBOOK_SECRET_KEY,
  },
  GOOGLE: {
    CLIENT_ID: GOOGLE_CLIENT_ID,
    CLIENT_SECRET: GOOGLE_CLIENT_SECRET,
  },
} as const;

export { ENV };
