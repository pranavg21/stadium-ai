/**
 * Firebase Authentication operations. Handles sign-in, sign-out,
 * and auth state changes with Google Sign-In.
 *
 * @module FirebaseAuth
 */

import { getAuth, signInWithPopup, signOut as firebaseSignOut, GoogleAuthProvider, onAuthStateChanged, type Auth, type User } from 'firebase/auth';
import { getFirebaseApp } from './firebase-config';
import { logger } from './logger';
import { extractErrorMessage } from './error-helpers';

/** Singleton auth instance. */
let authInstance: Auth | null = null;

/**
 * Returns the Firebase Auth instance.
 *
 * @returns The Auth instance
 */
export function getAuthInstance(): Auth {
  if (authInstance === null) {
    authInstance = getAuth(getFirebaseApp());
  }
  return authInstance;
}

/**
 * Signs in the user with Google popup authentication.
 *
 * @returns The authenticated Firebase user
 */
export async function signInWithGoogle(): Promise<User> {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(getAuthInstance(), provider);
    logger.info('User signed in', { uid: result.user.uid });
    return result.user;
  } catch (error: unknown) {
    logger.error('Sign-in failed', { error: extractErrorMessage(error) });
    throw error;
  }
}

/**
 * Signs out the current user.
 */
export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(getAuthInstance());
    logger.info('User signed out');
  } catch (error: unknown) {
    logger.error('Sign-out failed', { error: extractErrorMessage(error) });
    throw error;
  }
}

/**
 * Subscribes to authentication state changes.
 *
 * @param callback - Function called with the user (or null) on auth changes
 * @returns Unsubscribe function
 */
export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(getAuthInstance(), callback);
}
