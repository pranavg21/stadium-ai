/**
 * Application header with match info, auth controls, and simulation toggle.
 *
 * @module AppHeader
 */

import { Activity, Zap } from 'lucide-react';
import { CURRENT_MATCH } from '../../lib/stadium-data';
import { AuthButton } from '../ui/auth-button';

/** Props for the AppHeader component. */
interface AppHeaderProps {
  /** Whether simulation mode is active. */
  readonly isSimulating: boolean;
  /** Callback to toggle simulation. */
  readonly onToggleSimulation: () => void;
}

/**
 * Renders the application header with match info, auth, and simulation controls.
 *
 * @param props - Header properties
 * @returns The header component
 */
export function AppHeader({ isSimulating, onToggleSimulation }: AppHeaderProps): React.JSX.Element {
  return (
    <header className="app-header">
      <div className="header-match-section">
        <div className="header-match-info">
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
      <div className="header-actions">
        <AuthButton />
        <button
          className={`btn ${isSimulating ? 'btn-primary' : 'btn-secondary'}`}
          onClick={onToggleSimulation}
          aria-label={isSimulating ? 'Pause real-time simulation' : 'Start real-time simulation'}
          aria-pressed={isSimulating}
        >
          <Zap size={14} aria-hidden="true" />
          {isSimulating ? 'Live Simulation' : 'Simulation Paused'}
        </button>
      </div>
    </header>
  );
}
