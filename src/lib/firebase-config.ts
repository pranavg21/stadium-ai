/**
 * Firebase application initialization. Thin coordinator module
 * that only handles app setup. Auth, Firestore, and Analytics
 * are in separate modules for SRP compliance.
 *
 * @module FirebaseConfig
 */

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { logger } from './logger';

/** Firebase configuration from environment variables. */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined ?? 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined ?? 'demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined ?? 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined ?? 'demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined ?? '000000000000',
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined ?? '1:000:web:demo',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string | undefined ?? 'G-DEMO',
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
