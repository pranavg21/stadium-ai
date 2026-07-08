/**
 * Stadium zone map visualization with interactive dots
 * and an SVG stadium blueprint overlay.
 *
 * @module ZoneMap
 */

import { useCallback } from 'react';
import type { StadiumZone } from '../../lib/types';

/** Props for the ZoneMap component. */
interface ZoneMapProps {
  /** Array of stadium zones to display. */
  readonly zones: readonly StadiumZone[];
  /** Optional callback when a zone is clicked. */
  readonly onZoneClick?: ((zone: StadiumZone) => void) | undefined;
}

/**
 * Renders an interactive stadium zone map with status-colored dots
 * over an SVG stadium blueprint.
 *
 * @param props - Zone map properties
 * @returns The zone map element
 */
export function ZoneMap({ zones, onZoneClick }: ZoneMapProps): React.JSX.Element {
  return (
    <div className="zone-map" role="img" aria-label="Stadium zone map showing current occupancy levels">
      <StadiumBlueprint />
      {zones.map((zone) => (
        <ZoneDot key={zone.id} zone={zone} onClick={onZoneClick} />
      ))}
    </div>
  );
}

interface ZoneDotProps {
  readonly zone: StadiumZone;
  readonly onClick?: ((zone: StadiumZone) => void) | undefined;
}

function ZoneDot({ zone, onClick }: ZoneDotProps): React.JSX.Element {
  const handleClick = useCallback(() => {
    if (onClick !== undefined) {
      onClick(zone);
    }
  }, [onClick, zone]);

  return (
    <button
      className={`zone-dot ${zone.status}`}
      style={{ '--x': `${zone.coordinates.x}%`, '--y': `${zone.coordinates.y}%` } as React.CSSProperties}
      onClick={onClick !== undefined ? handleClick : undefined}
      aria-label={`${zone.name}: ${zone.occupancy}% occupancy, status ${zone.status}`}
      tabIndex={0}
    >
      <div className="zone-tooltip">
        <strong>{zone.name}</strong><br />
        {zone.occupancy}% • {zone.status}
      </div>
    </button>
  );
}

/**
 * Renders the SVG stadium blueprint overlay with field, sections,
 * and gate labels.
 *
 * @returns The stadium blueprint SVG element
 */
function StadiumBlueprint(): React.JSX.Element {
  return (
    <svg className="zone-map-svg" viewBox="0 0 800 500" aria-hidden="true">
      {/* Outer stadium ring */}
      <ellipse cx="400" cy="250" rx="370" ry="220" className="stadium-outline" />
      <ellipse cx="400" cy="250" rx="340" ry="195" className="stadium-outline-inner" />

      {/* Inner pitch */}
      <rect x="220" y="140" width="360" height="220" rx="8" className="stadium-pitch" />
      {/* Center circle */}
      <circle cx="400" cy="250" r="40" className="stadium-pitch-line" />
      <line x1="400" y1="140" x2="400" y2="360" className="stadium-pitch-line" />
      {/* Goal areas */}
      <rect x="220" y="200" width="50" height="100" className="stadium-pitch-line" />
      <rect x="530" y="200" width="50" height="100" className="stadium-pitch-line" />

      {/* Section dividers */}
      <line x1="400" y1="30" x2="400" y2="140" className="stadium-section-line" />
      <line x1="400" y1="360" x2="400" y2="470" className="stadium-section-line" />
      <line x1="60" y1="250" x2="220" y2="250" className="stadium-section-line" />
      <line x1="580" y1="250" x2="740" y2="250" className="stadium-section-line" />

      {/* Gate labels */}
      <text x="400" y="22" className="stadium-gate-label">GATE A</text>
      <text x="400" y="490" className="stadium-gate-label">GATE B</text>
      <text x="30" y="254" className="stadium-gate-label-side">W</text>
      <text x="770" y="254" className="stadium-gate-label-side">E</text>

      {/* Section labels */}
      <text x="320" y="80" className="stadium-section-label">Section 100</text>
      <text x="480" y="80" className="stadium-section-label">Section 200</text>
      <text x="400" y="440" className="stadium-section-label">South Concourse</text>
    </svg>
  );
}

