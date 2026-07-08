/**
 * Real-time operational alert feed component.
 * Displays alerts with severity badges and acknowledge functionality.
 *
 * @module AlertFeed
 */

import { useState, useEffect, useCallback } from 'react';
import { subscribeToAlerts } from '../../lib/firebase-firestore';
import { logger } from '../../lib/logger';
import type { OperationalAlert } from '../../lib/types';
import { DEMO_ALERTS } from '../../lib/stadium-data';

/**
 * Renders a live feed of operational alerts with severity indicators.
 *
 * @returns The alert feed element
 */
export function AlertFeed(): React.JSX.Element {
  const [alerts, setAlerts] = useState<readonly OperationalAlert[]>(DEMO_ALERTS);
  const [acknowledged, setAcknowledged] = useState<ReadonlySet<string>>(new Set());

  useEffect(() => {
    try {
      const unsubscribe = subscribeToAlerts((updated) => {
        if (updated.length > 0) {
          setAlerts(updated);
        }
      });
      return unsubscribe;
    } catch {
      logger.warn('Firestore alerts unavailable, using demo data');
      return undefined;
    }
  }, []);

  const handleAcknowledge = useCallback((alertId: string): void => {
    setAcknowledged((prev) => new Set([...prev, alertId]));
  }, []);

  const pendingAlerts = alerts.filter((a) => !acknowledged.has(a.id));

  return (
    <div className="alert-feed" role="log" aria-label="Operational alerts">
      <h3 className="alert-feed-heading">Active Alerts ({pendingAlerts.length})</h3>
      {pendingAlerts.length === 0 && (
        <p className="alert-feed-empty">No active alerts — all clear.</p>
      )}
      <div className="alert-feed-list">
        {pendingAlerts.map((alert) => (
          <div key={alert.id} className={`alert-feed-item alert-severity-${alert.severity}`} role="alert">
            <div className="alert-feed-header">
              <span className={`status-badge ${alert.severity === 'critical' ? 'critical' : alert.severity === 'warning' ? 'moderate' : 'low'}`}>
                {alert.severity}
              </span>
              <span className="alert-feed-title">{alert.title}</span>
            </div>
            <p className="alert-feed-message">{alert.message}</p>
            <button
              className="btn btn-secondary alert-ack-btn"
              onClick={handleAcknowledge.bind(null, alert.id)}
              aria-label={`Acknowledge alert: ${alert.title}`}
            >
              Acknowledge
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
