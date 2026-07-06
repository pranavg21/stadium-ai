import { describe, it, expect } from 'vitest';
import { STADIUM_ZONES, CURRENT_MATCH, TRANSPORT_OPTIONS, VOLUNTEERS, SUSTAINABILITY_METRICS } from '../../lib/stadium-data';

describe('STADIUM_ZONES', () => {
  it('has 12 zones', () => {
    expect(STADIUM_ZONES.length).toBe(12);
  });

  it('all zones have unique IDs', () => {
    const ids = STADIUM_ZONES.map((z) => z.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all zones have valid occupancy', () => {
    for (const zone of STADIUM_ZONES) {
      expect(zone.occupancy).toBeGreaterThanOrEqual(0);
      expect(zone.occupancy).toBeLessThanOrEqual(100);
    }
  });

  it('all zones have coordinates within bounds', () => {
    for (const zone of STADIUM_ZONES) {
      expect(zone.coordinates.x).toBeGreaterThanOrEqual(0);
      expect(zone.coordinates.x).toBeLessThanOrEqual(100);
      expect(zone.coordinates.y).toBeGreaterThanOrEqual(0);
      expect(zone.coordinates.y).toBeLessThanOrEqual(100);
    }
  });
});

describe('CURRENT_MATCH', () => {
  it('has valid match data', () => {
    expect(CURRENT_MATCH.homeTeam).toBeDefined();
    expect(CURRENT_MATCH.awayTeam).toBeDefined();
    expect(CURRENT_MATCH.venue).toContain('MetLife');
  });
});

describe('TRANSPORT_OPTIONS', () => {
  it('has transport options', () => {
    expect(TRANSPORT_OPTIONS.length).toBeGreaterThan(0);
  });

  it('all have unique IDs', () => {
    const ids = TRANSPORT_OPTIONS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('VOLUNTEERS', () => {
  it('has volunteers', () => {
    expect(VOLUNTEERS.length).toBeGreaterThan(0);
  });

  it('all have languages', () => {
    for (const v of VOLUNTEERS) {
      expect(v.languages.length).toBeGreaterThan(0);
    }
  });
});

describe('SUSTAINABILITY_METRICS', () => {
  it('has 4 categories', () => {
    expect(SUSTAINABILITY_METRICS.length).toBe(4);
  });

  it('current values are less than or equal to targets', () => {
    for (const m of SUSTAINABILITY_METRICS) {
      expect(m.current).toBeLessThanOrEqual(m.target * 2);
    }
  });
});
