/**
 * Operations Command Center page for staff and decision support.
 *
 * @module OperationsPage
 */

import { useCallback } from 'react';
import { StatCard } from '../components/ui/stat-card';
import { ChatPanel } from '../components/ui/chat-panel';
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
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <StatCard label="Active Volunteers" value={activeVolunteers} trend="stable" trendText={`${availableVolunteers} available`} />
        <StatCard label="Critical Zones" value={criticalZones} color={criticalZones > 0 ? 'var(--accent-rose)' : 'var(--accent-emerald)'} />
        <StatCard label="Total Volunteers" value={VOLUNTEERS.length} />
        <StatCard label="Response Time" value="3.2 min" trend="down" trendText="improving" />
      </div>
      <div className="grid-2">
        <div className="glass-card">
          <h2 className="util-style-35">Volunteer Roster</h2>
          <div className="util-style-36">
            {VOLUNTEERS.map((vol: Volunteer) => (
              <div key={vol.id} className="util-style-37">
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{vol.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{vol.currentTask ?? 'Unassigned'}</div>
                </div>
                <span className={`status-badge ${vol.status === 'assigned' ? 'moderate' : vol.status === 'available' ? 'low' : 'crowded'}`}>
                  {vol.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="util-style-38">AI Operations Assistant</h2>
          <ChatPanel messages={messages} isLoading={isLoading} onSend={handleSend} placeholder="Ask about staffing, crowd flow, or get recommendations..." />
        </div>
      </div>
    </section>
  );
}
