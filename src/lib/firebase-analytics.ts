/**
 * Firebase Analytics with typed event tracking.
 * Wraps Firebase Analytics to provide type-safe event helpers.
 *
 * @module FirebaseAnalytics
 */

import { getAnalytics, logEvent, type Analytics } from 'firebase/analytics';
import { getFirebaseApp, isFirebaseConfigured } from './firebase-config';
import { logger } from './logger';

/** Singleton analytics instance. */
let analyticsInstance: Analytics | null = null;

/**
 * Returns the Firebase Analytics instance.
 * Returns null if Firebase is not configured (demo mode).
 *
 * @returns The Analytics instance or null
 */
function getAnalyticsInstance(): Analytics | null {
  if (!isFirebaseConfigured()) {
    return null;
  }
  if (analyticsInstance === null) {
    analyticsInstance = getAnalytics(getFirebaseApp());
  }
  return analyticsInstance;
}

/**
 * Tracks a page view event.
 *
 * @param pageName - The name of the page viewed
 */
export function trackPageView(pageName: string): void {
  const analytics = getAnalyticsInstance();
  if (analytics !== null) {
    logEvent(analytics, 'page_view', { page_title: pageName });
  }
  logger.debug('Page view tracked', { page: pageName });
}

/**
 * Tracks a feature usage event.
 *
 * @param featureName - The name of the feature used
 * @param details - Optional additional details
 */
export function trackFeatureUsage(featureName: string, details?: Record<string, string>): void {
  const analytics = getAnalyticsInstance();
  if (analytics !== null) {
    logEvent(analytics, 'feature_used', { feature: featureName, ...details });
  }
  logger.debug('Feature usage tracked', { feature: featureName });
}

/**
 * Tracks an AI chat interaction event.
 *
 * @param language - The language used for the chat
 */
export function trackChatInteraction(language: string): void {
  const analytics = getAnalyticsInstance();
  if (analytics !== null) {
    logEvent(analytics, 'ai_chat', { language });
  }
}

/**
 * Tracks a data export event.
 *
 * @param format - The export format (json or csv)
 * @param dataType - The type of data exported
 */
export function trackExport(format: string, dataType: string): void {
  const analytics = getAnalyticsInstance();
  if (analytics !== null) {
    logEvent(analytics, 'data_export', { format, data_type: dataType });
  }
}
