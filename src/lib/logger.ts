/**
 * Structured JSON logger for Cloud Logging compatibility.
 * This is the ONLY file permitted to use console.* statements.
 * All other files must import and use this logger instead.
 *
 * @module Logger
 */

/** Supported log severity levels aligned with Cloud Logging. */
type LogSeverity = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

/** Structure of a single log entry for Cloud Logging. */
interface LogEntry {
  readonly severity: LogSeverity;
  readonly message: string;
  readonly timestamp: string;
  readonly component?: string;
  readonly [key: string]: unknown;
}

/**
 * Writes a structured JSON log entry to stdout/stderr.
 *
 * @param severity - The log severity level
 * @param message - The log message
 * @param meta - Optional metadata to include in the log entry
 */
function writeLog(severity: LogSeverity, message: string, meta?: Record<string, unknown>): void {
  const entry: LogEntry = {
    severity,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  };

  if (severity === 'ERROR' || severity === 'CRITICAL') {
    console.error(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
}

/** Structured logger instance for application-wide use. */
export const logger = {
  /** Logs a debug-level message. */
  debug: (message: string, meta?: Record<string, unknown>): void =>
    writeLog('DEBUG', message, meta),
  /** Logs an info-level message. */
  info: (message: string, meta?: Record<string, unknown>): void =>
    writeLog('INFO', message, meta),
  /** Logs a warning-level message. */
  warn: (message: string, meta?: Record<string, unknown>): void =>
    writeLog('WARNING', message, meta),
  /** Logs an error-level message. */
  error: (message: string, meta?: Record<string, unknown>): void =>
    writeLog('ERROR', message, meta),
  /** Logs a critical-level message. */
  critical: (message: string, meta?: Record<string, unknown>): void =>
    writeLog('CRITICAL', message, meta),
} as const;
