/**
 * Match information banner showing the current live match.
 * Displays team names, venue, match status, and kickoff time.
 *
 * @module MatchBanner
 */

import { CURRENT_MATCH } from '../../lib/stadium-data';
import { formatMatchTime } from '../../lib/date-helpers';

/**
 * Renders a banner displaying current match information.
 *
 * @returns The match banner element
 */
export function MatchBanner(): React.JSX.Element {
  const match = CURRENT_MATCH;
  const statusLabel = match.status === 'live'
    ? '🔴 LIVE'
    : match.status === 'halftime'
      ? '⏸ Halftime'
      : match.status === 'completed'
        ? '✅ Full Time'
        : `🕐 ${formatMatchTime(match.startTime)}`;

  return (
    <div className="glass-card match-banner" role="banner" aria-label="Current match information">
      <div className="match-teams">
        <span className="match-team-name">{match.homeTeam}</span>
        <span className="match-vs" aria-hidden="true">vs</span>
        <span className="match-team-name">{match.awayTeam}</span>
      </div>
      <div className="match-meta">
        <span className={`status-badge ${match.status === 'live' ? 'critical' : 'low'}`}>
          {statusLabel}
        </span>
        <span className="match-venue">{match.venue}</span>
      </div>
    </div>
  );
}
