/**
 * Vite client type declarations and custom environment variable types.
 * Extends ImportMetaEnv to provide type-safe access to env vars
 * without `as` casts in source files.
 *
 * @module ViteEnv
 */

/// <reference types="vite/client" />

/** Typed environment variables for the StadiumAI application. */
interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_GEMINI_API_KEY: string;
}

/** Extends ImportMeta with typed env. */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
