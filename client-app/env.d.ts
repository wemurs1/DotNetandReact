/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VIT_API_URL: string;
  readonly VITE_CHAT_URL: string;
}

interface ImportMeta {
  readonlyenv: ImportMetaEnv;
}
