import { describe, it, expect } from 'vitest';
import { isGeminiConfigured } from '../../lib/gemini-client';

describe('gemini-client', () => {
  it('reports not configured without API key', () => {
    expect(isGeminiConfigured()).toBe(false);
  });
});
