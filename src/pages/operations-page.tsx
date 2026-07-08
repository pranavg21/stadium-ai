/**
 * Operations Command Center page for staff and decision support.
 *
 * @module OperationsPage
 */

import { useCallback } from 'react';
import { StatCard } from '../components/ui/stat-card';
import { ChatPanel } from '../components/ui/chat-panel';
import { AlertFeed } from '../components/ui/alert-feed';
import { AlertCreator } from '../components/ui/alert-creator';
import { useChat } from '../hooks/use-chat';
import { OPERATIONS_SYSTEM_PROMPT, buildContextPrompt, formatZoneDataForPrompt } from '../lib/gemini-prompts';
import { VOLUNTEERS } from '../lib/stadium-data';
import type { StadiumZone, Volunteer } from '../lib/types';

/** Props for OperationsPage. */
interface OperationsPageProps {
  /** Current zone data. */
  readonly zones: readonly StadiumZone[];
}

/**
 * Renders the operations command center page.
 *
 * @param props - Operations page properties
 * @returns The operations page element
 */
export function OperationsPage({ zones }: OperationsPageProps): React.JSX.Element {
  const { messages, isLoading, sendMessage } = useChat();
  const activeVolunteers = VOLUNTEERS.filter((v: Volunteer) => v.status === 'assigned').length;
  const availableVolunteers = VOLUNTEERS.filter((v: Volunteer) => v.status === 'available').length;
  const criticalZones = zones.filter((z: StadiumZone) => z.status === 'critical').length;

  const handleSend = useCallback((msg: string): void => {
    const context = formatZoneDataForPrompt(zones);
    const prompt = buildContextPrompt(OPERATIONS_SYSTEM_PROMPT, context);
    sendMessage(msg, prompt);
  }, [sendMessage, zones]);

  return (
    <section>
      <div className="page-header">
        <h1>Operations Center</h1>
        <p>Real-time command and AI-powered decision support</p>
      </div>
      <div className="grid-4 mb-24">
        <StatCard label="Active Volunteers" value={activeVolunteers} trend="stable" trendText={`${availableVolunteers} available`} />
        <StatCard label="Critical Zones" value={criticalZones} color={criticalZones > 0 ? 'var(--accent-rose)' : 'var(--accent-emerald)'} />
        <StatCard label="Total Volunteers" value={VOLUNTEERS.length} />
        <StatCard label="Response Time" value="3.2 min" trend="down" trendText="improving" />
      </div>
      <div className="grid-2 mb-24">
        <AlertFeed />
        <AlertCreator />
      </div>
      <div className="grid-2">
        <div className="glass-card">
          <h2 className="ops-volunteer-heading">Volunteer Roster</h2>
          <div className="ops-volunteer-list">
            {VOLUNTEERS.map((vol: Volunteer) => (
              <div key={vol.id} className="ops-volunteer-item">
                <div>
                  <div className="ops-vol-name">{vol.name}</div>
                  <div className="ops-vol-task">{vol.currentTask ?? 'Unassigned'}</div>
                </div>
                <span className={`status-badge ${vol.status === 'assigned' ? 'moderate' : vol.status === 'available' ? 'low' : 'crowded'}`}>
                  {vol.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="ops-ai-heading">AI Operations Assistant</h2>
          <ChatPanel messages={messages} isLoading={isLoading} onSend={handleSend} placeholder="Ask about staffing, crowd flow, or get recommendations..." />
        </div>
      </div>
    </section>
  );
}
