import { describe, it, expect } from 'vitest';
import { deriveZoneStatus, simulateTick } from '../../lib/simulation';
import { STADIUM_ZONES } from '../../lib/stadium-data';
import { CRITICAL_OCCUPANCY_THRESHOLD, CROWDED_OCCUPANCY_THRESHOLD, MODERATE_OCCUPANCY_THRESHOLD } from '../../lib/constants';

describe('deriveZoneStatus', () => {
  it('returns critical for high occupancy', () => {
    expect(deriveZoneStatus(CRITICAL_OCCUPANCY_THRESHOLD)).toBe('critical');
    expect(deriveZoneStatus(95)).toBe('critical');
  });

  it('returns crowded for medium-high occupancy', () => {
    expect(deriveZoneStatus(CROWDED_OCCUPANCY_THRESHOLD)).toBe('crowded');
    expect(deriveZoneStatus(80)).toBe('crowded');
  });

  it('returns moderate for medium occupancy', () => {
    expect(deriveZoneStatus(MODERATE_OCCUPANCY_THRESHOLD)).toBe('moderate');
    expect(deriveZoneStatus(50)).toBe('moderate');
  });

  it('returns low for low occupancy', () => {
    expect(deriveZoneStatus(10)).toBe('low');
    expect(deriveZoneStatus(0)).toBe('low');
  });

  it('handles boundary at critical threshold', () => {
    expect(deriveZoneStatus(CRITICAL_OCCUPANCY_THRESHOLD - 1)).toBe('crowded');
  });

  it('handles boundary at crowded threshold', () => {
    expect(deriveZoneStatus(CROWDED_OCCUPANCY_THRESHOLD - 1)).toBe('moderate');
  });

  it('handles boundary at moderate threshold', () => {
    expect(deriveZoneStatus(MODERATE_OCCUPANCY_THRESHOLD - 1)).toBe('low');
  });
});

describe('simulateTick', () => {
  it('returns same number of zones', () => {
    const result = simulateTick(STADIUM_ZONES);
    expect(result.length).toBe(STADIUM_ZONES.length);
  });

  it('keeps occupancy within bounds', () => {
    const result = simulateTick(STADIUM_ZONES);
    for (const zone of result) {
      expect(zone.occupancy).toBeGreaterThanOrEqual(5);
      expect(zone.occupancy).toBeLessThanOrEqual(98);
    }
  });

  it('updates status based on new occupancy', () => {
    const result = simulateTick(STADIUM_ZONES);
    for (const zone of result) {
      expect(zone.status).toBe(deriveZoneStatus(zone.occupancy));
    }
  });

  it('updates currentCount consistently with occupancy', () => {
    const result = simulateTick(STADIUM_ZONES);
    for (const zone of result) {
      const expected = Math.round((zone.occupancy / 100) * zone.capacity);
      expect(zone.currentCount).toBe(expected);
    }
  });

  it('preserves zone IDs and names', () => {
    const result = simulateTick(STADIUM_ZONES);
    for (let i = 0; i < result.length; i++) {
      expect(result[i]!.id).toBe(STADIUM_ZONES[i]!.id);
      expect(result[i]!.name).toBe(STADIUM_ZONES[i]!.name);
    }
  });
});
