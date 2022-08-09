import { AppEnvironment } from '@common/enums/app/app-environment.enum';

const { NODE_ENV, PORT, HOST, FRONTEND_URL, DATABASE_URL, SECRET_KEY } =
  process.env;

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
  EMAIL: {
    SMTP_HOST: 'smtp.gmail.com',
    SMTP_PORT: 587,
    SMTP_USER: 'autoline.binary@gmail.com',
    SMTP_PASSWORD: 'pyvwijwvexspvzfi',
    API_URL: 'autoline.com',
    ACTIVATE_URL: 'http://localhost:3001/api/v1/activate/',
  },
} as const;

export { ENV };
