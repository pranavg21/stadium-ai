/**
 * React hook for Firebase authentication state management.
 * Provides current user, loading state, and auth actions.
 *
 * @module UseAuth
 */

import { useState, useEffect, useCallback } from 'react';
import type { User } from 'firebase/auth';
import { onAuthChange, signInWithGoogle, signOut } from '../lib/firebase-auth';
import { logger } from '../lib/logger';
import { extractErrorMessage } from '../lib/error-helpers';

/** Return type for the useAuth hook. */
interface UseAuthReturn {
  /** The current Firebase user, or null if not authenticated. */
  readonly user: User | null;
  /** Whether authentication state is still loading. */
  readonly loading: boolean;
  /** Error message if auth operation failed. */
  readonly error: string | null;
  /** Triggers Google sign-in popup. */
  readonly handleSignIn: () => Promise<void>;
  /** Signs out the current user. */
  readonly handleSignOut: () => Promise<void>;
}

/**
 * Hook that manages Firebase authentication state.
 *
 * @returns Auth state and action handlers
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleSignIn = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      await signInWithGoogle();
    } catch (err: unknown) {
      const msg = extractErrorMessage(err);
      setError(msg);
      logger.error('Sign-in hook error', { error: msg });
    }
  }, []);

  const handleSignOut = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      await signOut();
    } catch (err: unknown) {
      const msg = extractErrorMessage(err);
      setError(msg);
      logger.error('Sign-out hook error', { error: msg });
    }
  }, []);

  return { user, loading, error, handleSignIn, handleSignOut };
}
