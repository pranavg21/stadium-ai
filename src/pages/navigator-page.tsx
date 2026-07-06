/**
 * AI Navigator page with pathfinding and zone selection.
 *
 * @module NavigatorPage
 */

import { useState, useCallback } from 'react';
import { ChatPanel } from '../components/ui/chat-panel';
import { useChat } from '../hooks/use-chat';
import { NAVIGATOR_SYSTEM_PROMPT } from '../lib/gemini-prompts';
import { findRoute } from '../services/navigation-service';
import type { StadiumZone } from '../lib/types';
import { STADIUM_ZONES } from '../lib/stadium-data';

/** Props for the NavigatorPage. */
interface NavigatorPageProps {
  /** Current zone data. */
  readonly zones: readonly StadiumZone[];
}

/**
 * Renders the AI Navigator page with pathfinding and chat.
 *
 * @param props - Navigator page properties
 * @returns The navigator page element
 */
export function NavigatorPage({ zones }: NavigatorPageProps): React.JSX.Element {
  const { messages, isLoading, sendMessage } = useChat();
  const [from, setFrom] = useState('zone-a');
  const [to, setTo] = useState('zone-f');
  const route = findRoute(from, to, zones);
  const zoneNames = new Map(STADIUM_ZONES.map((z: StadiumZone) => [z.id, z.name] as const));

  const handleSend = useCallback((msg: string): void => {
    sendMessage(msg, NAVIGATOR_SYSTEM_PROMPT);
  }, [sendMessage]);

  const handleFromChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFrom(e.target.value);
  }, []);

  const handleToChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTo(e.target.value);
  }, []);

  return (
    <section>
      <div className="page-header">
        <h1>AI Navigator</h1>
        <p>Smart pathfinding with real-time crowd awareness</p>
      </div>
      <div className="grid-2">
        <div className="glass-card">
          <h2 className="util-style-25">Find Route</h2>
          <div className="util-style-26">
            <label htmlFor="nav-from" className="nav-label">From</label>
            <select id="nav-from" className="chat-input" value={from} onChange={handleFromChange} aria-label="Starting zone">
              {STADIUM_ZONES.map((z: StadiumZone) => <option key={z.id} value={z.id}>{z.name}</option>)}
            </select>
            <label htmlFor="nav-to" className="nav-label">To</label>
            <select id="nav-to" className="chat-input" value={to} onChange={handleToChange} aria-label="Destination zone">
              {STADIUM_ZONES.map((z: StadiumZone) => <option key={z.id} value={z.id}>{z.name}</option>)}
            </select>
          </div>
          {route !== null && (
            <div className="glass-card nav-result-bg">
              <h3 className="util-style-27">Recommended Route</h3>
              <ol className="nav-route-list">
                {route.path.map((id: string) => (
                  <li key={id} className="util-style-28">{zoneNames.get(id) ?? id}</li>
                ))}
              </ol>
              <p className="util-style-29">
                Est. {route.estimatedMinutes} min • Congestion: {route.congestion}%
              </p>
            </div>
          )}
        </div>
        <div>
          <h2 className="util-style-30">Ask AI Navigator</h2>
          <ChatPanel messages={messages} isLoading={isLoading} onSend={handleSend} placeholder="Where do you want to go?" />
        </div>
      </div>
    </section>
  );
}
