/**
 * React error boundary component with structured logging.
 * Uses logger.error() instead of console.error().
 *
 * @module ErrorBoundary
 */

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { logger } from '../../lib/logger';
import { extractErrorMessage } from '../../lib/error-helpers';

/** Props for the ErrorBoundary component. */
interface ErrorBoundaryProps {
  /** Child components to wrap. */
  readonly children: ReactNode;
}

/** State for the ErrorBoundary component. */
interface ErrorBoundaryState {
  /** Whether an error has been caught. */
  readonly hasError: boolean;
  /** The error message for display. */
  readonly errorMessage: string;
}

/**
 * Error boundary that catches rendering errors and displays a fallback UI.
 * Logs errors using the structured logger, not console.error.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /** Initializes the error boundary state. */
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  /** Updates state when an error is caught. */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: extractErrorMessage(error) };
  }

  /** Logs the error using the structured logger. */
  componentDidCatch(error: Error, info: ErrorInfo): void {
    logger.error('React error boundary caught error', {
      error: extractErrorMessage(error),
      componentStack: info.componentStack ?? 'unknown',
    });
  }

  /** Renders children or fallback UI on error. */
  private handleRetry = (): void => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="glass-card" role="alert" style={{ textAlign: 'center', padding: '48px' }}>
          <h2 style={{ color: 'var(--accent-rose)', marginBottom: '8px' }}>Something went wrong</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{this.state.errorMessage}</p>
          <button
            className="btn btn-primary"
            onClick={this.handleRetry}
            aria-label="Retry loading the page"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
