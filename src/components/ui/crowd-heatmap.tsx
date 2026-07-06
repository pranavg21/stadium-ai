/**
 * Crowd density heatmap visualization component.
 *
 * @module CrowdHeatmap
 */

import type { StadiumZone } from '../../lib/types';

/** Props for the CrowdHeatmap component. */
interface CrowdHeatmapProps {
  /** Array of stadium zones to visualize. */
  readonly zones: readonly StadiumZone[];
}

/**
 * Maps occupancy to a heatmap color.
 *
 * @param occupancy - Occupancy percentage (0-100)
 * @returns CSS color string
 */
function getHeatColor(occupancy: number): string {
  if (occupancy >= 90) { return 'rgba(244, 63, 94, 0.6)'; }
  if (occupancy >= 70) { return 'rgba(245, 158, 11, 0.5)'; }
  if (occupancy >= 40) { return 'rgba(59, 130, 246, 0.4)'; }
  return 'rgba(16, 185, 129, 0.3)';
}

/**
 * Renders a grid-based crowd density heatmap.
 *
 * @param props - Heatmap properties
 * @returns The heatmap element
 */
export function CrowdHeatmap({ zones }: CrowdHeatmapProps): React.JSX.Element {
  return (
    <div className="heatmap-grid" role="grid" aria-label="Crowd density heatmap">
      {zones.map((zone) => (
        <div
          key={zone.id}
          className="heatmap-cell"
          role="gridcell"
          style={{ background: getHeatColor(zone.occupancy) }}
          aria-label={`${zone.name}: ${zone.occupancy}% occupancy`}
          title={`${zone.name}: ${zone.occupancy}%`}
        >
          {zone.occupancy}%
        </div>
      ))}
    </div>
  );
}
