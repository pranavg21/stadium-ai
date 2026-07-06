import { describe, it, expect } from 'vitest';

describe('firebase-analytics', () => {
  it('module exports tracking functions', async () => {
    const mod = await import('../../lib/firebase-analytics');
    expect(mod.trackPageView).toBeDefined();
    expect(mod.trackFeatureUsage).toBeDefined();
    expect(mod.trackChatInteraction).toBeDefined();
    expect(mod.trackExport).toBeDefined();
  });
});
