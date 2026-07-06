/**
 * Shared TypeScript type definitions for the StadiumAI application.
 * All interfaces use readonly fields for immutability.
 *
 * @module Types
 */

/* ── Zone Types ── */

/** Possible occupancy status levels for a stadium zone. */
export type ZoneStatus = 'critical' | 'crowded' | 'moderate' | 'low';

/** Represents a single zone within the stadium. */
export interface StadiumZone {
  /** Unique zone identifier. */
  readonly id: string;
  /** Human-readable zone name. */
  readonly name: string;
  /** Zone category (e.g., seating, concession). */
  readonly category: ZoneCategory;
  /** Current occupancy percentage (0-100). */
  readonly occupancy: number;
  /** Maximum capacity of the zone. */
  readonly capacity: number;
  /** Current number of people in the zone. */
  readonly currentCount: number;
  /** Computed status based on occupancy thresholds. */
  readonly status: ZoneStatus;
  /** Geographic coordinates for map display. */
  readonly coordinates: ZoneCoordinates;
}

/** Category classification for stadium zones. */
export type ZoneCategory =
  | 'seating'
  | 'concession'
  | 'entrance'
  | 'restroom'
  | 'vip'
  | 'medical'
  | 'parking'
  | 'merchandise';

/** Geographic coordinates for a zone on the stadium map. */
export interface ZoneCoordinates {
  /** X position as percentage (0-100). */
  readonly x: number;
  /** Y position as percentage (0-100). */
  readonly y: number;
}

/* ── Chat Types ── */

/** Role of a message sender in the chat. */
export type ChatRole = 'user' | 'assistant' | 'system';

/** Supported languages for the multilingual concierge. */
export type SupportedLanguage =
  | 'en' | 'es' | 'fr' | 'de' | 'pt' | 'ar'
  | 'zh' | 'ja' | 'ko' | 'hi' | 'ru' | 'it'
  | 'nl' | 'tr' | 'pl' | 'sv' | 'da' | 'no'
  | 'fi' | 'th';

/** A single message in the AI chat conversation. */
export interface ChatMessage {
  /** Unique message identifier. */
  readonly id: string;
  /** The sender role. */
  readonly role: ChatRole;
  /** The message text content. */
  readonly content: string;
  /** ISO timestamp of when the message was sent. */
  readonly timestamp: string;
  /** Language code of the message. */
  readonly language?: SupportedLanguage | undefined;
}

/* ── Sustainability Types ── */

/** Sustainability metric category. */
export type SustainabilityCategory = 'waste' | 'energy' | 'water' | 'carbon';

/** A single sustainability metric reading. */
export interface SustainabilityMetric {
  /** Metric category. */
  readonly category: SustainabilityCategory;
  /** Current value. */
  readonly current: number;
  /** Target value. */
  readonly target: number;
  /** Unit of measurement. */
  readonly unit: string;
  /** Trend direction. */
  readonly trend: 'up' | 'down' | 'stable';
}

export * from './types-domain';
