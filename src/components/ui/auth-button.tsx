/**
 * Authentication button for the app header.
 * Shows sign-in button or user profile when authenticated.
 *
 * @module AuthButton
 */

import { useAuth } from '../../hooks/use-auth';

/**
 * Renders an authentication button with sign-in/out functionality.
 *
 * @returns The auth button element
 */
export function AuthButton(): React.JSX.Element {
  const { user, loading, handleSignIn, handleSignOut } = useAuth();

  if (loading) {
    return <div className="auth-btn-skeleton" aria-hidden="true" />;
  }

  if (user !== null) {
    return (
      <div className="auth-profile">
        {user.photoURL !== null && user.photoURL !== undefined && (
          <img
            src={user.photoURL}
            alt={`${user.displayName ?? 'User'} avatar`}
            className="auth-avatar"
            width={28}
            height={28}
          />
        )}
        <span className="auth-name">{user.displayName ?? 'User'}</span>
        <button className="btn btn-secondary auth-signout-btn" onClick={handleSignOut} aria-label="Sign out">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button className="btn btn-primary auth-signin-btn" onClick={handleSignIn} aria-label="Sign in with Google">
      Sign In
    </button>
  );
}
