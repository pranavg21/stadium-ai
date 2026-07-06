/**
 * Offline fallback page for PWA support.
 * This is a fully functional page, NOT a placeholder.
 *
 * @module OfflinePage
 */

import { WifiOff } from 'lucide-react';

/**
 * Renders the offline fallback page with helpful info.
 *
 * @returns The offline page element
 */
export function OfflinePage(): React.JSX.Element {
  return (
    <section style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div className="page-header">
        <h1>Offline Mode</h1>
        <p>You appear to be offline. Some features are still available.</p>
      </div>
      <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <WifiOff size={48} aria-hidden="true" style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
        <h2 className="util-style-31">Limited Connectivity</h2>
        <p className="util-style-32">
          The AI features require an internet connection. While offline, you can still access:
        </p>
        <ul className="util-style-33">
          <li style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--accent-emerald)' }} aria-hidden="true">✓</span> Cached stadium map and zone info
          </li>
          <li style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--accent-emerald)' }} aria-hidden="true">✓</span> Emergency contact information
          </li>
          <li style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--accent-emerald)' }} aria-hidden="true">✓</span> Accessibility facility locations
          </li>
          <li style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--accent-emerald)' }} aria-hidden="true">✓</span> Previously viewed transport schedules
          </li>
        </ul>
        <div className="util-style-34">
          <strong style={{ color: 'var(--accent-rose)' }}>Emergency:</strong>
          <span style={{ color: 'var(--text-secondary)' }}> Dial 911 or contact nearest steward</span>
        </div>
      </div>
    </section>
  );
}
