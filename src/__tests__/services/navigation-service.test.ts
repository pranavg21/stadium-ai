import { describe, it, expect } from 'vitest';
import { findRoute } from '../../services/navigation-service';
import { STADIUM_ZONES } from '../../lib/stadium-data';

describe('findRoute', () => {
  it('finds route between adjacent zones', () => {
    const route = findRoute('zone-a', 'zone-b', STADIUM_ZONES);
    expect(route).not.toBeNull();
    expect(route!.path[0]).toBe('zone-a');
    expect(route!.path[route!.path.length - 1]).toBe('zone-b');
  });

  it('finds route between distant zones', () => {
    const route = findRoute('zone-a', 'zone-k', STADIUM_ZONES);
    expect(route).not.toBeNull();
    expect(route!.path.length).toBeGreaterThan(2);
  });

  it('returns same-zone route for identical from/to', () => {
    const route = findRoute('zone-a', 'zone-a', STADIUM_ZONES);
    expect(route).not.toBeNull();
    expect(route!.path).toEqual(['zone-a']);
    expect(route!.estimatedMinutes).toBe(2);
  });

  it('calculates congestion along route', () => {
    const route = findRoute('zone-a', 'zone-f', STADIUM_ZONES);
    expect(route).not.toBeNull();
    expect(route!.congestion).toBeGreaterThanOrEqual(0);
    expect(route!.congestion).toBeLessThanOrEqual(100);
  });

  it('marks routes as accessible', () => {
    const route = findRoute('zone-a', 'zone-b', STADIUM_ZONES);
    expect(route).not.toBeNull();
    expect(route!.accessible).toBe(true);
  });

  it('calculates estimated minutes based on path length', () => {
    const route = findRoute('zone-a', 'zone-b', STADIUM_ZONES);
    expect(route).not.toBeNull();
    expect(route!.estimatedMinutes).toBe(route!.path.length * 2);
  });
});
