/**
 * Main dashboard page with key stadium metrics and zone map.
 *
 * @module DashboardPage
 */

import { useMemo } from 'react';
import { StatCard } from '../components/ui/stat-card';
import { ZoneMap } from '../components/ui/zone-map';
import { ExportButton } from '../components/ui/export-button';
import { MatchBanner } from '../components/ui/match-banner';
import { AlertFeed } from '../components/ui/alert-feed';
import type { StadiumZone } from '../lib/types';

/** Props for the DashboardPage component. */
interface DashboardPageProps {
  /** Current zone data. */
  readonly zones: readonly StadiumZone[];
}

/**
 * Renders the stadium dashboard with metrics and zone map.
 *
 * @param props - Dashboard page properties
 * @returns The dashboard page element
 */
export function DashboardPage({ zones }: DashboardPageProps): React.JSX.Element {
  const stats = useMemo(() => {
    const avg = Math.round(zones.reduce((s: number, z: StadiumZone) => s + z.occupancy, 0) / Math.max(zones.length, 1));
    const total = zones.reduce((s: number, z: StadiumZone) => s + z.currentCount, 0);
    const critical = zones.filter((z: StadiumZone) => z.status === 'critical').length;
    const capacity = zones.reduce((s: number, z: StadiumZone) => s + z.capacity, 0);
    return { avg, total, critical, capacity };
  }, [zones]);

  return (
    <section>
      <div className="page-header dashboard-header">
        <div>
          <h1>Stadium Dashboard</h1>
          <p>Real-time overview of stadium operations and crowd metrics</p>
        </div>
        <ExportButton data={zones} label="dashboard-zones" />
      </div>
      <MatchBanner />
      <div className="grid-4 mb-24">
        <StatCard label="Total Attendance" value={stats.total.toLocaleString()} trend="up" trendText={`of ${stats.capacity.toLocaleString()} capacity`} />
        <StatCard label="Avg Occupancy" value={`${stats.avg}%`} color={stats.avg > 70 ? 'var(--accent-amber)' : 'var(--accent-emerald)'} />
        <StatCard label="Active Zones" value={zones.length} trend="stable" trendText="zones monitored" />
        <StatCard label="Critical Zones" value={stats.critical} color={stats.critical > 0 ? 'var(--accent-rose)' : 'var(--accent-emerald)'} trend={stats.critical > 0 ? 'up' : 'stable'} trendText={stats.critical > 0 ? 'needs attention' : 'all clear'} />
      </div>
      <div className="grid-2">
        <div className="glass-card">
          <h2 className="zone-map-heading">Live Zone Map</h2>
          <ZoneMap zones={zones} />
        </div>
        <AlertFeed />
      </div>
    </section>
  );
}
