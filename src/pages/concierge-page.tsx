/**
 * AI Concierge page with multilingual chat support.
 *
 * @module ConciergePage
 */

import { useCallback } from 'react';
import { ChatPanel } from '../components/ui/chat-panel';
import { useChat } from '../hooks/use-chat';
import { CONCIERGE_SYSTEM_PROMPT, buildContextPrompt, formatZoneDataForPrompt } from '../lib/gemini-prompts';
import type { StadiumZone } from '../lib/types';
import { trackChatInteraction } from '../lib/firebase-analytics';

/** Props for the ConciergePage. */
interface ConciergePageProps {
  /** Current zone data for context injection. */
  readonly zones: readonly StadiumZone[];
}

/** Quick suggestion chips for the concierge. */
const QUICK_CHIPS: readonly string[] = [
  'Where is the nearest restroom?',
  'Best food options nearby?',
  'How do I get to my seat?',
  'Is there wheelchair access?',
  '¿Dónde está la salida más cercana?',
  'Où sont les toilettes?',
];

/**
 * Renders the multilingual AI concierge chat page.
 *
 * @param props - Concierge page properties
 * @returns The concierge page element
 */
export function ConciergePage({ zones }: ConciergePageProps): React.JSX.Element {
  const { messages, isLoading, sendMessage } = useChat();

  const handleSend = useCallback((msg: string): void => {
    const zoneContext = formatZoneDataForPrompt(zones);
    const enrichedPrompt = buildContextPrompt(CONCIERGE_SYSTEM_PROMPT, zoneContext);
    sendMessage(msg, enrichedPrompt);
    trackChatInteraction('en');
  }, [sendMessage, zones]);

  return (
    <section>
      <div className="page-header">
        <h1>AI Concierge</h1>
        <p>Your multilingual stadium assistant — ask anything in any language</p>
      </div>
      <div className="util-style-10">
        {QUICK_CHIPS.map((chip: string) => (
          <button key={chip} className="btn btn-secondary chip-compact" onClick={handleSend.bind(null, chip)} disabled={isLoading} aria-label={`Ask: ${chip}`}>
            {chip}
          </button>
        ))}
      </div>
      <ChatPanel messages={messages} isLoading={isLoading} onSend={handleSend} placeholder="Ask in any language..." />
    </section>
  );
}
