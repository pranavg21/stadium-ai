/**
 * Tests for domain-specific TypeScript type definitions.
 * Validates that domain types are correctly structured.
 *
 * @module TypesDomainTest
 */

import { describe, it, expect } from 'vitest';
import type {
  TransportMode,
  TransportOption,
  VolunteerStatus,
  Volunteer,
  UserProfile,
  UserRole,
  AlertSeverity,
  OperationalAlert,
  NavigationRoute,
  MatchInfo,
  MatchStatus,
} from '../../lib/types-domain';

describe('types-domain', () => {
  it('TransportOption has expected shape', () => {
    const opt: TransportOption = {
      id: 'metro-1',
      mode: 'metro' satisfies TransportMode,
      name: 'Metro Line 1',
      estimatedMinutes: 12,
      available: true,
      congestion: 40,
    };
    expect(opt.id).toBe('metro-1');
    expect(opt.mode).toBe('metro');
  });

  it('Volunteer has expected shape with optional fields', () => {
    const vol: Volunteer = {
      id: 'v-1',
      name: 'Alice',
      status: 'available' satisfies VolunteerStatus,
      languages: ['en'],
    };
    expect(vol.assignedZone).toBeUndefined();
    expect(vol.currentTask).toBeUndefined();
  });

  it('UserProfile has expected shape', () => {
    const user: UserProfile = {
      uid: 'u-1',
      displayName: 'Pranav',
      email: 'pranav@example.com',
      role: 'fan' satisfies UserRole,
    };
    expect(user.photoURL).toBeUndefined();
  });

  it('OperationalAlert has expected shape', () => {
    const alert: OperationalAlert = {
      id: 'a-1',
      title: 'Gate Overflow',
      message: 'Gate B is at capacity',
      severity: 'warning' satisfies AlertSeverity,
      createdAt: new Date().toISOString(),
      acknowledged: false,
    };
    expect(alert.zoneId).toBeUndefined();
    expect(alert.severity).toBe('warning');
  });

  it('NavigationRoute has expected shape', () => {
    const route: NavigationRoute = {
      from: 'Gate A',
      to: 'Section 101',
      path: ['Gate A', 'Concourse 1', 'Section 101'],
      estimatedMinutes: 5,
      accessible: true,
      congestion: 30,
    };
    expect(route.path.length).toBe(3);
  });

  it('MatchInfo has expected shape', () => {
    const match: MatchInfo = {
      id: 'm-1',
      homeTeam: 'Brazil',
      awayTeam: 'France',
      venue: 'MetLife Stadium',
      startTime: new Date().toISOString(),
      status: 'live' satisfies MatchStatus,
    };
    expect(match.status).toBe('live');
  });
});
