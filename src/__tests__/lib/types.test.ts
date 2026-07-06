import { describe, it, expect } from 'vitest';
import type { StadiumZone, ChatMessage, UserProfile, OperationalAlert, NavigationRoute, ZoneStatus } from '../../lib/types';

describe('types', () => {
  it('ZoneStatus accepts valid values', () => {
    const statuses: ZoneStatus[] = ['critical', 'crowded', 'moderate', 'low'];
    expect(statuses.length).toBe(4);
  });

  it('StadiumZone shape is valid', () => {
    const zone: StadiumZone = {
      id: 'z1', name: 'Test', category: 'seating', occupancy: 50,
      capacity: 1000, currentCount: 500, status: 'moderate',
      coordinates: { x: 50, y: 50 },
    };
    expect(zone.id).toBe('z1');
  });

  it('ChatMessage shape is valid', () => {
    const msg: ChatMessage = {
      id: 'm1', role: 'user', content: 'Hello', timestamp: new Date().toISOString(),
    };
    expect(msg.role).toBe('user');
  });

  it('UserProfile shape is valid', () => {
    const user: UserProfile = {
      uid: 'u1', displayName: 'Test', email: 'test@test.com', role: 'fan',
    };
    expect(user.role).toBe('fan');
  });

  it('OperationalAlert shape is valid', () => {
    const alert: OperationalAlert = {
      id: 'a1', title: 'Test', message: 'Msg', severity: 'warning',
      createdAt: new Date().toISOString(), acknowledged: false,
    };
    expect(alert.severity).toBe('warning');
  });

  it('NavigationRoute shape is valid', () => {
    const route: NavigationRoute = {
      from: 'a', to: 'b', path: ['a', 'b'],
      estimatedMinutes: 5, accessible: true, congestion: 50,
    };
    expect(route.path.length).toBe(2);
  });
});
