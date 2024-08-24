// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLERK_PUBLISHABLE_KEY: string;
  // Add mroe environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
