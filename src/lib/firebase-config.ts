/**
 * Firebase application initialization. Thin coordinator module
 * that only handles app setup. Auth, Firestore, and Analytics
 * are in separate modules for SRP compliance.
 *
 * @module FirebaseConfig
 */

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { logger } from './logger';

/**
 * Reads an environment variable safely, returning a fallback if not set.
 *
 * @param key - The environment variable key on import.meta.env
 * @param fallback - The fallback value if the env var is missing
 * @returns The resolved string value
 */
function readEnv(key: string, fallback: string): string {
  const value: unknown = (import.meta.env as Record<string, unknown>)[key];
  return typeof value === 'string' && value.length > 0 ? value : fallback;
}

/** Firebase configuration from environment variables. */
const firebaseConfig = {
  apiKey: readEnv('VITE_FIREBASE_API_KEY', 'demo-api-key'),
  authDomain: readEnv('VITE_FIREBASE_AUTH_DOMAIN', 'demo.firebaseapp.com'),
  projectId: readEnv('VITE_FIREBASE_PROJECT_ID', 'demo-project'),
  storageBucket: readEnv('VITE_FIREBASE_STORAGE_BUCKET', 'demo.appspot.com'),
  messagingSenderId: readEnv('VITE_FIREBASE_MESSAGING_SENDER_ID', '000000000000'),
  appId: readEnv('VITE_FIREBASE_APP_ID', '1:000:web:demo'),
  measurementId: readEnv('VITE_FIREBASE_MEASUREMENT_ID', 'G-DEMO'),
} as const;

/** Singleton Firebase app instance. */
let firebaseApp: FirebaseApp | null = null;

/**
 * Returns the initialized Firebase app instance.
 * Creates one on first call (singleton pattern).
 *
 * @returns The Firebase app instance
 */
export function getFirebaseApp(): FirebaseApp {
  if (firebaseApp === null) {
    firebaseApp = initializeApp(firebaseConfig);
    logger.info('Firebase app initialized', { projectId: firebaseConfig.projectId });
  }
  return firebaseApp;
}

/**
 * Checks if Firebase is configured with real credentials.
 *
 * @returns True if real credentials are provided
 */
export function isFirebaseConfigured(): boolean {
  return firebaseConfig.apiKey !== 'demo-api-key';
}
