import { describe, it, expect } from 'vitest';

describe('firebase-firestore', () => {
  it('module exports CRUD functions', async () => {
    const mod = await import('../../lib/firebase-firestore');
    expect(mod.saveZoneData).toBeDefined();
    expect(mod.fetchAllZones).toBeDefined();
    expect(mod.subscribeToZones).toBeDefined();
    expect(mod.subscribeToAlerts).toBeDefined();
  });
});
