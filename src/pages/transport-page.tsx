/**
 * Smart Transport planner page with transit options.
 *
 * @module TransportPage
 */

import { TRANSPORT_OPTIONS } from '../lib/stadium-data';
import { ExportButton } from '../components/ui/export-button';
import { formatDuration } from '../lib/date-helpers';
import { Bus, Train, Car, MapPin } from 'lucide-react';
import type { TransportMode, TransportOption } from '../lib/types';

/** Maps transport mode to icon. */
const MODE_ICONS: Record<TransportMode, React.JSX.Element> = {
  metro: <Train aria-hidden="true" size={18} />,
  bus: <Bus aria-hidden="true" size={18} />,
  taxi: <Car aria-hidden="true" size={18} />,
  rideshare: <Car aria-hidden="true" size={18} />,
  walking: <MapPin aria-hidden="true" size={18} />,
  parking: <Car aria-hidden="true" size={18} />,
};

/**
 * Renders the Smart Transport planner page.
 *
 * @returns The transport page element
 */
export function TransportPage(): React.JSX.Element {
  const sorted = [...TRANSPORT_OPTIONS].sort((a, b) => a.congestion - b.congestion);
  const csvHeaders = ['Name', 'Mode', 'Time', 'Congestion', 'Available'];
  const csvRows = sorted.map((t: TransportOption) => [t.name, t.mode, formatDuration(t.estimatedMinutes), `${t.congestion}%`, t.available ? 'Yes' : 'No']);

  return (
    <section>
      <div className="page-header util-style-44">
        <div>
          <h1>Smart Transport</h1>
          <p>Real-time transit and parking intelligence</p>
        </div>
        <ExportButton data={sorted} label="transport" csvHeaders={csvHeaders} csvRows={csvRows} />
      </div>
      <div className="util-style-45">
        {sorted.map((option: TransportOption) => {
          const style: React.CSSProperties & { '--dynamic-color'?: string } = {
            '--dynamic-color': option.congestion > 70 ? 'var(--accent-amber)' : 'var(--accent-emerald)',
          };
          return (
          <div key={option.id} className="glass-card util-style-46">
            <div className="util-style-47">
              <div className="transport-icon">{MODE_ICONS[option.mode]}</div>
              <div>
                <h2 className="transport-name">{option.name}</h2>
                <span className="util-style-48">{option.mode}</span>
              </div>
            </div>
            <div className="util-style-49">
              <div className="transport-right">
                <div className="transport-time">{formatDuration(option.estimatedMinutes)}</div>
                <div className="transport-label-sm">est. travel</div>
              </div>
              <div className="transport-congestion-wrap">
                <div
                  className="congestion-dynamic-color"
                  style={style}
                >
                  {option.congestion}%
                </div>
                <div className="transport-congestion-label">congestion</div>
              </div>
              <span className={`status-badge ${option.available ? 'low' : 'critical'}`} aria-label={`Status: ${option.available ? 'available' : 'unavailable'}`}>
                {option.available ? 'Available' : 'Full'}
              </span>
            </div>
          </div>
          );
        })}
      </div>
    </section>
  );
}
