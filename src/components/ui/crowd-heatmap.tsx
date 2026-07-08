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
 * Maps occupancy to a heatmap CSS class name.
 *
 * @param occupancy - Occupancy percentage (0-100)
 * @returns CSS class suffix for the occupancy level
 */
function getHeatClass(occupancy: number): string {
  if (occupancy >= 90) { return 'heat-critical'; }
  if (occupancy >= 70) { return 'heat-crowded'; }
  if (occupancy >= 40) { return 'heat-moderate'; }
  return 'heat-low';
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
          className={`heatmap-cell ${getHeatClass(zone.occupancy)}`}
          role="gridcell"
          aria-label={`${zone.name}: ${zone.occupancy}% occupancy`}
          title={`${zone.name}: ${zone.occupancy}%`}
        >
          {zone.occupancy}%
        </div>
      ))}
    </div>
  );
}

