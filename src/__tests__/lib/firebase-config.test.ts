import { describe, it, expect } from 'vitest';
import { isFirebaseConfigured } from '../../lib/firebase-config';

describe('firebase-config', () => {
  it('reports not configured with demo keys', () => {
    expect(isFirebaseConfigured()).toBe(false);
  });
});
