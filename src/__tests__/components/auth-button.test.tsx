import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthButton } from '../../components/ui/auth-button';

vi.mock('../../hooks/use-auth', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    error: null,
    handleSignIn: vi.fn(),
    handleSignOut: vi.fn(),
  }),
}));

describe('AuthButton', () => {
  it('renders sign-in button when not authenticated', () => {
    render(<AuthButton />);
    expect(screen.getByLabelText('Sign in with Google')).toBeInTheDocument();
  });
});
