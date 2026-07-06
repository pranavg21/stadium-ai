/**
 * Reusable metric stat card component for dashboards.
 *
 * @module StatCard
 */

/** Props for the StatCard component. */
interface StatCardProps {
  /** Metric label text. */
  readonly label: string;
  /** Metric display value. */
  readonly value: string | number;
  /** Trend direction for the metric. */
  readonly trend?: 'up' | 'down' | 'stable';
  /** Trend description text. */
  readonly trendText?: string;
  /** Accent color for the value. */
  readonly color?: string;
}

/**
 * Renders a stat card with value and optional trend indicator.
 *
 * @param props - Stat card properties
 * @returns The stat card element
 */
export function StatCard({ label, value, trend, trendText, color }: StatCardProps): React.JSX.Element {
  return (
    <div className="stat-card" role="group" aria-label={`${label}: ${value}`}>
      <span className="stat-card-label">{label}</span>
      <span className="stat-card-value" style={color ? { color } : undefined}>
        {value}
      </span>
      {trend !== undefined && trendText !== undefined && (
        <span className={`stat-card-trend ${trend}`} aria-label={`Trend: ${trendText}`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendText}
        </span>
      )}
    </div>
  );
}
