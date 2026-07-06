/**
 * Application-wide constants. ALL magic numbers, durations, limits,
 * and configuration values live here. No hardcoded values in source files.
 *
 * @module Constants
 */

/* ── App Metadata ── */

/** Application display name. */
export const APP_NAME = 'StadiumAI' as const;

/** Application version string. */
export const APP_VERSION = '1.0.0' as const;

/** Application description for metadata. */
export const APP_DESCRIPTION = 'AI-Powered Smart Stadium Platform for FIFA World Cup 2026' as const;

/* ── Timing Constants ── */

/** Interval for simulation data updates in milliseconds. */
export const SIMULATION_INTERVAL_MS = 30_000 as const;

/** Delay between streaming AI response chunks in milliseconds. */
export const STREAMING_CHUNK_DELAY_MS = 15 as const;

/** Maximum characters per streaming chunk. */
export const STREAMING_CHUNK_SIZE = 12 as const;

/** Duration to show copy-feedback tooltip in milliseconds. */
export const COPY_FEEDBACK_DURATION_MS = 2_000 as const;

/** Debounce delay for search input in milliseconds. */
export const SEARCH_DEBOUNCE_MS = 300 as const;

/** Toast notification auto-dismiss duration in milliseconds. */
export const TOAST_DURATION_MS = 4_000 as const;

/* ── Chat Constants ── */

/** Maximum number of messages to send as context to Gemini. */
export const CHAT_CONTEXT_WINDOW = 6 as const;

/** Maximum character length for a single chat message. */
export const MAX_CHAT_MESSAGE_LENGTH = 2_000 as const;

/** Maximum character length for user input fields. */
export const MAX_INPUT_LENGTH = 500 as const;

/* ── Stadium Constants ── */

/** Total number of zones in the stadium. */
export const TOTAL_ZONES = 12 as const;

/** Maximum occupancy percentage before a zone is considered critical. */
export const CRITICAL_OCCUPANCY_THRESHOLD = 90 as const;

/** Occupancy percentage at which a zone is considered crowded. */
export const CROWDED_OCCUPANCY_THRESHOLD = 70 as const;

/** Occupancy percentage at which a zone is considered moderate. */
export const MODERATE_OCCUPANCY_THRESHOLD = 40 as const;

/* ── Simulation Constants ── */

/** Maximum percentage change per simulation tick. */
export const SIMULATION_MAX_DELTA = 5 as const;

/** Minimum occupancy percentage in simulation. */
export const SIMULATION_MIN_OCCUPANCY = 5 as const;

/** Maximum occupancy percentage in simulation. */
export const SIMULATION_MAX_OCCUPANCY = 98 as const;

/* ── API Constants ── */

/** Content type for JSON requests and responses. */
export const CONTENT_TYPE_JSON = 'application/json' as const;

/** Rate limit: maximum requests per minute for general endpoints. */
export const RATE_LIMIT_GENERAL = 100 as const;

/** Rate limit: maximum requests per minute for AI chat. */
export const RATE_LIMIT_AI_CHAT = 20 as const;

/* ── Export Constants ── */

/** Default filename prefix for data exports. */
export const EXPORT_FILENAME_PREFIX = 'stadiumai-export' as const;

/** MIME type for JSON file downloads. */
export const MIME_TYPE_JSON = 'application/json' as const;

/** MIME type for CSV file downloads. */
export const MIME_TYPE_CSV = 'text/csv' as const;

/* ── Accessibility Constants ── */

/** ID of the main content area for skip-link navigation. */
export const MAIN_CONTENT_ID = 'main-content' as const;

/** Number of supported languages for the multilingual concierge. */
export const SUPPORTED_LANGUAGE_COUNT = 20 as const;

/* ── Route Paths ── */

/** Application route paths. */
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  NAVIGATOR: '/navigator',
  CROWD: '/crowd',
  CONCIERGE: '/concierge',
  ACCESSIBILITY: '/accessibility',
  TRANSPORT: '/transport',
  SUSTAINABILITY: '/sustainability',
  OPERATIONS: '/operations',
  OFFLINE: '/offline',
} as const;

/* ── Zone Status Labels ── */

/** Human-readable labels for zone occupancy status. */
export const ZONE_STATUS_LABELS = {
  CRITICAL: 'Critical',
  CROWDED: 'Crowded',
  MODERATE: 'Moderate',
  LOW: 'Low',
} as const;

/* ── Sustainability Metrics ── */

/** Target waste diversion rate percentage. */
export const WASTE_DIVERSION_TARGET = 85 as const;

/** Target energy efficiency improvement percentage. */
export const ENERGY_EFFICIENCY_TARGET = 30 as const;

/** Target water conservation percentage. */
export const WATER_CONSERVATION_TARGET = 40 as const;
