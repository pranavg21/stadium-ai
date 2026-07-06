import { describe, it, expect } from 'vitest';

describe('export-helpers', () => {
  it('module exports JSON and CSV helpers', async () => {
    const mod = await import('../../lib/export-helpers');
    expect(mod.exportAsJson).toBeDefined();
    expect(mod.exportAsCsv).toBeDefined();
  });
});
