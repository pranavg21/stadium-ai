/**
 * Alert creation form for operational staff to report incidents.
 * Uses Zod schema validation for all input fields.
 *
 * @module AlertCreator
 */

import { useState, useCallback } from 'react';
import { alertCreationSchema } from '../../lib/schemas';
import { logger } from '../../lib/logger';
import type { AlertSeverity } from '../../lib/types';

/** Severity options for the alert form. */
const SEVERITY_OPTIONS: readonly AlertSeverity[] = ['info', 'warning', 'critical'];

/**
 * Renders a form for creating operational alerts.
 *
 * @returns The alert creator form element
 */
export function AlertCreator(): React.JSX.Element {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertSeverity>('info');
  const [submitted, setSubmitted] = useState(false);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  }, []);

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value);
  }, []);

  const handleSeverityChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSeverity(e.target.value as AlertSeverity);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent): void => {
    e.preventDefault();
    const result = alertCreationSchema.safeParse({ title, message, severity });
    if (!result.success) {
      logger.warn('Alert validation failed', { errors: result.error.message });
      return;
    }
    logger.info('Alert created', { title: result.data.title, severity: result.data.severity });
    setSubmitted(true);
    setTitle('');
    setMessage('');
    setSeverity('info');
    setTimeout(() => { setSubmitted(false); }, 3000);
  }, [title, message, severity]);

  return (
    <form className="alert-creator-form glass-card" onSubmit={handleSubmit} aria-label="Create operational alert">
      <h3 className="alert-creator-heading">Report Incident</h3>
      <label htmlFor="alert-title" className="form-label">Title</label>
      <input
        id="alert-title"
        className="chat-input"
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Brief incident title"
        required
        aria-required="true"
      />
      <label htmlFor="alert-severity" className="form-label">Severity</label>
      <select id="alert-severity" className="chat-input" value={severity} onChange={handleSeverityChange} aria-label="Alert severity">
        {SEVERITY_OPTIONS.map((s) => (
          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
        ))}
      </select>
      <label htmlFor="alert-message" className="form-label">Details</label>
      <textarea
        id="alert-message"
        className="chat-input alert-textarea"
        value={message}
        onChange={handleMessageChange}
        placeholder="Describe the incident..."
        required
        aria-required="true"
        rows={3}
      />
      <button type="submit" className="btn btn-primary" aria-label="Submit alert">
        {submitted ? '✓ Alert Submitted' : 'Submit Alert'}
      </button>
    </form>
  );
}
