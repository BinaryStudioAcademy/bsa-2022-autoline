const { VITE_API_ORIGIN_URL, VITE_SENTRY_DSN, VITE_EXCHANGE_RATE_URL } =
  import.meta.env;

const ENV = {
  API_PATH: VITE_API_ORIGIN_URL ?? '',
  SENTRY: {
    DSN: VITE_SENTRY_DSN,
  },
  EXCHANGE_RATE_URL: VITE_EXCHANGE_RATE_URL ?? '',
} as const;

export { ENV };
