import { describe, it, expect } from 'vitest';

describe('firebase-auth', () => {
  it('module exports sign-in functions', async () => {
    const mod = await import('../../lib/firebase-auth');
    expect(mod.signInWithGoogle).toBeDefined();
    expect(mod.signOut).toBeDefined();
    expect(mod.onAuthChange).toBeDefined();
  });
});
