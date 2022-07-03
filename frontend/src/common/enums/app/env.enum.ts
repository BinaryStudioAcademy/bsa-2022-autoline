const { VITE_API_ORIGIN_URL } = import.meta.env;

const ENV = {
  API_PATH: VITE_API_ORIGIN_URL ?? '',
} as const;

export { ENV };
