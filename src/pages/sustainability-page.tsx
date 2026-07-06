/**
 * Sustainability Monitor page with environmental metrics.
 *
 * @module SustainabilityPage
 */

import { ProgressRing } from '../components/ui/progress-ring';
import { ExportButton } from '../components/ui/export-button';
import { SUSTAINABILITY_METRICS } from '../lib/stadium-data';
import type { SustainabilityMetric } from '../lib/types';

/** Color map for sustainability categories. */
const CATEGORY_COLORS: Record<string, string> = {
  waste: 'var(--accent-amber)',
  energy: 'var(--accent-blue)',
  water: 'var(--accent-emerald)',
  carbon: 'var(--accent-purple)',
};

/** Labels for sustainability categories. */
const CATEGORY_LABELS: Record<string, string> = {
  waste: 'Waste Diversion',
  energy: 'Energy Reduction',
  water: 'Water Conservation',
  carbon: 'Carbon Offset',
};

/**
 * Renders the sustainability monitor page.
 *
 * @returns The sustainability page element
 */
export function SustainabilityPage(): React.JSX.Element {
  return (
    <section>
      <div className="page-header util-style-39">
        <div>
          <h1>Sustainability</h1>
          <p>Environmental impact tracking for FIFA World Cup 2026</p>
        </div>
        <ExportButton data={SUSTAINABILITY_METRICS} label="sustainability" />
      </div>
      <div className="grid-4">
        {SUSTAINABILITY_METRICS.map((metric: SustainabilityMetric) => (
          <div key={metric.category} className="glass-card" style={{ textAlign: 'center' }}>
            <h2 className="util-style-40">
              {CATEGORY_LABELS[metric.category] ?? metric.category}
            </h2>
            <div className="util-style-41">
              <ProgressRing progress={Math.round((metric.current / metric.target) * 100)} color={CATEGORY_COLORS[metric.category] ?? 'var(--accent-blue)'} />
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {metric.current} / {metric.target} {metric.unit}
            </div>
            <span className={`stat-card-trend ${metric.trend}`} style={{ fontSize: '0.75rem' }}>
              {metric.trend === 'up' ? '↑ Improving' : metric.trend === 'down' ? '↓ Declining' : '→ Stable'}
            </span>
          </div>
        ))}
      </div>
      <div className="glass-card" style={{ marginTop: '24px' }}>
        <h2 className="util-style-42">Sustainability Initiatives</h2>
        <ul className="util-style-43">
          <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}><span style={{ color: 'var(--accent-emerald)' }} aria-hidden="true">🌱</span> 100% renewable energy for venue operations</li>
          <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}><span aria-hidden="true">♻️</span> Zero single-use plastics in concession areas</li>
          <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}><span aria-hidden="true">💧</span> Rainwater harvesting for restroom facilities</li>
          <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}><span aria-hidden="true">🚌</span> Free shuttle buses to reduce car emissions</li>
        </ul>
      </div>
    </section>
  );
}
