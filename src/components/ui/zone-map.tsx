/**
 * Stadium zone map visualization with interactive dots.
 *
 * @module ZoneMap
 */

import type { StadiumZone } from '../../lib/types';

/** Props for the ZoneMap component. */
interface ZoneMapProps {
  /** Array of stadium zones to display. */
  readonly zones: readonly StadiumZone[];
  /** Optional callback when a zone is clicked. */
  readonly onZoneClick?: (zone: StadiumZone) => void;
}

/**
 * Renders an interactive stadium zone map with status-colored dots.
 *
 * @param props - Zone map properties
 * @returns The zone map element
 */
export function ZoneMap({ zones, onZoneClick }: ZoneMapProps): React.JSX.Element {
  return (
    <div className="zone-map" role="img" aria-label="Stadium zone map showing current occupancy levels">
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.8rem',
        opacity: 0.3, pointerEvents: 'none',
      }}>
        🏟️ MetLife Stadium
      </div>
      {zones.map((zone) => (
        <button
          key={zone.id}
          className={`zone-dot ${zone.status}`}
          style={{ left: `${zone.coordinates.x}%`, top: `${zone.coordinates.y}%` }}
          onClick={onZoneClick ? onZoneClick.bind(null, zone) : undefined}
          aria-label={`${zone.name}: ${zone.occupancy}% occupancy, status ${zone.status}`}
          tabIndex={0}
        >
          <div className="zone-tooltip">
            <strong>{zone.name}</strong><br />
            {zone.occupancy}% • {zone.status}
          </div>
        </button>
      ))}
    </div>
  );
}
