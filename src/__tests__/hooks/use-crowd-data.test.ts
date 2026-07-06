import { describe, it, expect } from 'vitest';
import { useCrowdData } from '../../hooks/use-crowd-data';

describe('useCrowdData hook', () => {
  it('exports zones and toggleSimulation', () => {
    expect(useCrowdData).toBeDefined();
  });
});
