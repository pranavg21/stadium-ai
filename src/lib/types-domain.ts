/**
 * Domain-specific TypeScript type definitions for the StadiumAI application.
 * All interfaces use readonly fields for immutability.
 *
 * @module TypesDomain
 */

import type { SupportedLanguage } from './types';

/* ── Transport Types ── */

/** Available transportation modes. */
export type TransportMode = 'metro' | 'bus' | 'taxi' | 'rideshare' | 'walking' | 'parking';

/** A single transportation option. */
export interface TransportOption {
  /** Unique option identifier. */
  readonly id: string;
  /** Transport mode type. */
  readonly mode: TransportMode;
  /** Route or service name. */
  readonly name: string;
  /** Estimated travel time in minutes. */
  readonly estimatedMinutes: number;
  /** Current availability status. */
  readonly available: boolean;
  /** Current congestion level (0-100). */
  readonly congestion: number;
}

/* ── Volunteer Types ── */

/** Volunteer assignment status. */
export type VolunteerStatus = 'available' | 'assigned' | 'on-break' | 'off-duty';

/** A volunteer staff member. */
export interface Volunteer {
  /** Unique volunteer identifier. */
  readonly id: string;
  /** Volunteer display name. */
  readonly name: string;
  /** Current assignment status. */
  readonly status: VolunteerStatus;
  /** Assigned zone identifier, if any. */
  readonly assignedZone?: string | undefined;
  /** Languages spoken by the volunteer. */
  readonly languages: readonly SupportedLanguage[];
  /** Current task description. */
  readonly currentTask?: string | undefined;
}

/* ── Auth Types ── */

/** Authenticated user profile from Firebase Auth. */
export interface UserProfile {
  /** Firebase user UID. */
  readonly uid: string;
  /** User display name. */
  readonly displayName: string;
  /** User email address. */
  readonly email: string;
  /** User avatar URL. */
  readonly photoURL?: string | undefined;
  /** User role in the system. */
  readonly role: UserRole;
}

/** User roles for access control. */
export type UserRole = 'fan' | 'staff' | 'organizer' | 'volunteer' | 'admin';

/* ── Alert Types ── */

/** Alert severity levels. */
export type AlertSeverity = 'info' | 'warning' | 'critical';

/** An operational alert in the system. */
export interface OperationalAlert {
  /** Unique alert identifier. */
  readonly id: string;
  /** Alert title. */
  readonly title: string;
  /** Detailed alert message. */
  readonly message: string;
  /** Alert severity. */
  readonly severity: AlertSeverity;
  /** Related zone identifier. */
  readonly zoneId?: string | undefined;
  /** ISO timestamp of alert creation. */
  readonly createdAt: string;
  /** Whether the alert has been acknowledged. */
  readonly acknowledged: boolean;
}

/* ── Navigation Types ── */

/** A navigation route between two points in the stadium. */
export interface NavigationRoute {
  /** Starting zone identifier. */
  readonly from: string;
  /** Destination zone identifier. */
  readonly to: string;
  /** Ordered list of zone IDs along the route. */
  readonly path: readonly string[];
  /** Estimated walking time in minutes. */
  readonly estimatedMinutes: number;
  /** Whether this route is wheelchair accessible. */
  readonly accessible: boolean;
  /** Current congestion level along the route (0-100). */
  readonly congestion: number;
}

/* ── Match Types ── */

/** Information about a FIFA World Cup match. */
export interface MatchInfo {
  /** Unique match identifier. */
  readonly id: string;
  /** Home team name. */
  readonly homeTeam: string;
  /** Away team name. */
  readonly awayTeam: string;
  /** Match venue name. */
  readonly venue: string;
  /** ISO timestamp of match start. */
  readonly startTime: string;
  /** Current match status. */
  readonly status: MatchStatus;
}

/** Possible match statuses. */
export type MatchStatus = 'upcoming' | 'live' | 'halftime' | 'completed';
