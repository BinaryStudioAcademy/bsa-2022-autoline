const {
  VITE_API_ORIGIN_URL,
  VITE_SENTRY_DSN,
  FACEBOOK_APP_ID,
  FACEBOOK_SECRET_KEY,
  DEV,
} = import.meta.env;

const ENV = {
  API_PATH: VITE_API_ORIGIN_URL ?? '',
  SENTRY: {
    DSN: VITE_SENTRY_DSN,
  },
  DEV,

  FACEBOOK_APP_ID: FACEBOOK_APP_ID,
  FACEBOOK_SECRET_KEY: FACEBOOK_SECRET_KEY,
} as const;

export { ENV };
