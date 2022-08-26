const { VITE_API_ORIGIN_URL, VITE_SENTRY_DSN } = import.meta.env;

const ENV = {
  API_PATH: VITE_API_ORIGIN_URL ?? '',
  SENTRY: {
    DSN: VITE_SENTRY_DSN,
  },
} as const;

export { ENV };
