/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ORIGIN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
