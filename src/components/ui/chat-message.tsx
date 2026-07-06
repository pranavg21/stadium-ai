/**
 * Single chat message bubble component.
 *
 * @module ChatMessage
 */

import { formatRelativeTime } from '../../lib/date-helpers';
import type { ChatMessage as ChatMessageType } from '../../lib/types';

/** Props for the ChatMessageComponent. */
interface ChatMessageProps {
  /** The chat message data. */
  readonly message: ChatMessageType;
}

/**
 * Renders a single chat message bubble.
 *
 * @param props - Chat message properties
 * @returns The chat message element
 */
export function ChatMessageComponent({ message }: ChatMessageProps): React.JSX.Element {
  return (
    <div
      className={`chat-message ${message.role}`}
      role={message.role === 'assistant' ? 'status' : undefined}
      aria-label={`${message.role === 'user' ? 'You' : 'StadiumAI'}: ${message.content}`}
    >
      <p>{message.content}</p>
      <time
        dateTime={message.timestamp}
        className="util-style-3"
      >
        {formatRelativeTime(message.timestamp)}
      </time>
    </div>
  );
}
