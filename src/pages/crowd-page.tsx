/**
 * Crowd Intelligence page with heatmap and zone status grid.
 *
 * @module CrowdPage
 */

import { CrowdHeatmap } from '../components/ui/crowd-heatmap';
import { ExportButton } from '../components/ui/export-button';
import type { StadiumZone } from '../lib/types';

/** Props for the CrowdPage. */
interface CrowdPageProps {
  /** Current zone data. */
  readonly zones: readonly StadiumZone[];
}

/**
 * Renders the crowd intelligence page with heatmap and zone list.
 *
 * @param props - Crowd page properties
 * @returns The crowd page element
 */
export function CrowdPage({ zones }: CrowdPageProps): React.JSX.Element {
  const sortedZones = [...zones].sort((a, b) => b.occupancy - a.occupancy);
  const csvHeaders = ['Zone', 'Occupancy', 'Status', 'Current', 'Capacity'];
  const csvRows = sortedZones.map((z: StadiumZone) => [z.name, `${z.occupancy}%`, z.status, String(z.currentCount), String(z.capacity)]);

  return (
    <section>
      <div className="page-header util-style-11">
        <div>
          <h1>Crowd Intelligence</h1>
          <p>Real-time crowd density monitoring and analytics</p>
        </div>
        <ExportButton data={sortedZones} label="crowd-data" csvHeaders={csvHeaders} csvRows={csvRows} />
      </div>
      <div className="grid-2">
        <div className="glass-card">
          <h2 className="util-style-12">Density Heatmap</h2>
          <CrowdHeatmap zones={zones} />
        </div>
        <div className="glass-card">
          <h2 className="util-style-13">Zone Status</h2>
          <div className="util-style-14">
            {sortedZones.map((zone: StadiumZone) => (
              <div key={zone.id} className="util-style-15">
                <span className="zone-name-label">{zone.name}</span>
                <div className="util-style-16">
                  <span className={`status-badge ${zone.status}`}>{zone.status}</span>
                  <span className="util-style-17">{zone.occupancy}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
