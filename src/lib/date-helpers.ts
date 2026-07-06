/**
 * Date and time formatting utilities for match schedules and timestamps.
 *
 * @module DateHelpers
 */

/**
 * Formats an ISO timestamp into a human-readable date string.
 *
 * @param isoString - The ISO 8601 timestamp string
 * @returns A formatted date string (e.g., "July 6, 2026")
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formats an ISO timestamp into a time string.
 *
 * @param isoString - The ISO 8601 timestamp string
 * @returns A formatted time string (e.g., "2:30 PM")
 */
export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Formats an ISO timestamp into a relative time string.
 *
 * @param isoString - The ISO 8601 timestamp string
 * @returns A relative time string (e.g., "5 minutes ago")
 */
export function formatRelativeTime(isoString: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffMs = now - then;
  const diffMinutes = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMinutes / 60);

  if (diffMinutes < 1) {
    return 'Just now';
  }
  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  return formatDate(isoString);
}

/**
 * Formats a duration in minutes to a human-readable string.
 *
 * @param minutes - Duration in minutes
 * @returns Formatted duration (e.g., "1h 30m" or "45 min")
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Returns the current ISO timestamp string.
 *
 * @returns ISO 8601 formatted current timestamp
 */
export function nowIso(): string {
  return new Date().toISOString();
}
