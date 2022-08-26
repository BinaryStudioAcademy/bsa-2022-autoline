const { VITE_SENTRY_DSN } = import.meta.env;

const ENV = {
  API_PATH: import.meta.env.VITE_API_ORIGIN_URL ?? 'api/v1',
  SENTRY: {
    DSN: VITE_SENTRY_DSN,
  },
} as const;

export { ENV };
