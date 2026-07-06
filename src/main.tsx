/**
 * Application entry point. Mounts the React app with StrictMode
 * and registers the service worker for PWA support.
 *
 * @module Main
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { logger } from './lib/logger';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error('Root element not found. Ensure index.html has a div with id="root".');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

/* ── Service Worker Registration ── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        logger.info('Service worker registered', { scope: reg.scope });
      })
      .catch((err: unknown) => {
        logger.warn('Service worker registration failed', {
          error: err instanceof Error ? err.message : String(err),
        });
      });
  });
}
