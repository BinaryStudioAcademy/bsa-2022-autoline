import { AppEnvironment } from '@common/enums/app/app-environment.enum';
import { config } from 'dotenv';

interface AppConfig {
  PORT: number;
  HOST: string;
  NODE_ENV: AppEnvironment;
  FRONTEND_URL: string;
  BACKEND_URL: string;
}

interface DatabaseConfig {
  DATABASE_URL: string;
}

interface ApiConfig {
  V1_PREFIX: string;
}

interface JwtConfig {
  SECRET: string;
  EXPIRES_IN: string;
  REFRESH_EXPIRES_IN: string;
}

interface SentryConfig {
  DSN: string;
  ENABLE: boolean;
}

export interface ConfigInterface {
  APP: AppConfig;
  DATABASE: DatabaseConfig;
  API: ApiConfig;
  SENTRY: SentryConfig;
  JWT: JwtConfig;
}

const configuration = (): ConfigInterface => {
  config();

  const {
    NODE_ENV,
    HOST,
    PORT,
    DATABASE_URL,
    API_BASE_PREFIX,
    SENTRY_DSN,
    SENTRY_ENABLE,
    FRONTEND_URL,
    JWT_SECRET,
  } = process.env;

  const host = HOST || 'localhost';
  const port = Number(PORT) || 3001;

  return {
    APP: {
      PORT: port,
      HOST: host,
      NODE_ENV: <AppEnvironment>NODE_ENV || AppEnvironment.DEVELOPMENT,
      FRONTEND_URL: FRONTEND_URL || 'http://localhost:3000',
      BACKEND_URL: `http://${host}:${port}`,
    },
    DATABASE: {
      DATABASE_URL: DATABASE_URL || '',
    },
    API: {
      V1_PREFIX: API_BASE_PREFIX || '',
    },
    JWT: {
      SECRET: JWT_SECRET || 'secret',
      EXPIRES_IN: '24h',
      REFRESH_EXPIRES_IN: '60d',
    },
    SENTRY: {
      DSN: SENTRY_DSN || '',
      ENABLE: SENTRY_ENABLE !== 'false',
    },
  };
};

const CONFIG = configuration();

export { CONFIG };
