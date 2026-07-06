/**
 * Reusable AI chat panel component with input and message history.
 *
 * @module ChatPanel
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { ChatMessageComponent } from './chat-message';
import { sanitizeInput } from '../../lib/input-sanitizer';
import { MAX_CHAT_MESSAGE_LENGTH } from '../../lib/constants';
import type { ChatMessage } from '../../lib/types';

/** Props for the ChatPanel component. */
interface ChatPanelProps {
  /** Array of chat messages. */
  readonly messages: readonly ChatMessage[];
  /** Whether a response is loading. */
  readonly isLoading: boolean;
  /** Callback when user sends a message. */
  readonly onSend: (message: string) => void;
  /** Placeholder text for the input. */
  readonly placeholder?: string;
}

/**
 * Renders a chat panel with message history and input field.
 *
 * @param props - Chat panel properties
 * @returns The chat panel element
 */
export function ChatPanel({ messages, isLoading, onSend, placeholder }: ChatPanelProps): React.JSX.Element {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = useCallback((e: React.FormEvent): void => {
    e.preventDefault();
    const sanitized = sanitizeInput(input, MAX_CHAT_MESSAGE_LENGTH);
    if (sanitized.length === 0) {
      return;
    }
    onSend(sanitized);
    setInput('');
  }, [input, onSend]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-messages" role="log" aria-live="polite" aria-label="Chat messages">
        {messages.map((msg) => (
          <ChatMessageComponent key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="chat-message assistant" role="status" aria-label="Generating response">
            <span className="skeleton skeleton-text skeleton-w60" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input-area" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={handleInputChange}
          placeholder={placeholder ?? 'Ask StadiumAI anything...'}
          aria-label="Chat message input"
          disabled={isLoading}
          maxLength={MAX_CHAT_MESSAGE_LENGTH}
        />
        <button
          type="submit"
          className="btn btn-primary btn-icon"
          disabled={isLoading || input.trim().length === 0}
          aria-label="Send message"
        >
          <Send size={18} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
