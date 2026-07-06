/**
 * Application header with match info and simulation toggle.
 *
 * @module AppHeader
 */

import { Activity, Zap } from 'lucide-react';
import { CURRENT_MATCH } from '../../lib/stadium-data';

/** Props for the AppHeader component. */
interface AppHeaderProps {
  /** Whether simulation mode is active. */
  readonly isSimulating: boolean;
  /** Callback to toggle simulation. */
  readonly onToggleSimulation: () => void;
}

/**
 * Renders the application header with match info and simulation controls.
 *
 * @param props - Header properties
 * @returns The header component
 */
export function AppHeader({ isSimulating, onToggleSimulation }: AppHeaderProps): React.JSX.Element {
  return (
    <header className="app-header">
      <div className="util-style-1">
        <div className="util-style-2">
          <Activity size={16} aria-hidden="true" className="header-match-icon" />
          <span className="header-match-label">
            {CURRENT_MATCH.homeTeam} vs {CURRENT_MATCH.awayTeam}
          </span>
          <span className="status-badge low" aria-label="Match status: live">LIVE</span>
        </div>
        <span className="header-venue-label">
          {CURRENT_MATCH.venue}
        </span>
      </div>
      <button
        className={`btn ${isSimulating ? 'btn-primary' : 'btn-secondary'}`}
        onClick={onToggleSimulation}
        aria-label={isSimulating ? 'Pause real-time simulation' : 'Start real-time simulation'}
        aria-pressed={isSimulating}
      >
        <Zap size={14} aria-hidden="true" />
        {isSimulating ? 'Live Simulation' : 'Simulation Paused'}
      </button>
    </header>
  );
}
