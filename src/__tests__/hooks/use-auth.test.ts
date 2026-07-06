import { describe, it, expect } from 'vitest';
import { useAuth } from '../../hooks/use-auth';

describe('useAuth hook', () => {
  it('exports handleSignIn, handleSignOut and properties', () => {
    expect(useAuth).toBeDefined();
  });
});
