import { describe, it, expect } from 'vitest';
import { useReducedMotion } from '../../hooks/use-reduced-motion';

describe('useReducedMotion hook', () => {
  it('exports reduced motion hook', () => {
    expect(useReducedMotion).toBeDefined();
  });
});
