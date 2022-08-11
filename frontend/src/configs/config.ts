import { config } from 'dotenv';

interface AppConfig {
  API_PATH: string;
  SENTRY: {
    DSN: string;
    ENABLE: boolean;
  };
}

export interface ConfigInterface {
  APP: AppConfig;
}

const configuration = (): ConfigInterface => {
  config();

  const { VITE_API_ORIGIN_URL, VITE_SENTRY_DSN, SENTRY_ENABLE } = process.env;

  return {
    APP: {
      API_PATH: VITE_API_ORIGIN_URL || 'http://localhost:3001/api/v1',
      SENTRY: {
        DSN: VITE_SENTRY_DSN || '',
        ENABLE: SENTRY_ENABLE !== 'false',
      },
    },
  };
};

const CONFIG = configuration();

export { CONFIG };
