/**
 * React hook for AI chat interactions with message history.
 *
 * @module UseChat
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { sendChatMessage } from '../lib/gemini-chat';
import { extractErrorMessage } from '../lib/error-helpers';
import { logger } from '../lib/logger';
import { nowIso } from '../lib/date-helpers';
import type { ChatMessage } from '../lib/types';

/** Return type for the useChat hook. */
interface UseChatReturn {
  /** Array of chat messages. */
  readonly messages: readonly ChatMessage[];
  /** Whether a response is being generated. */
  readonly isLoading: boolean;
  /** Sends a user message and gets AI response. */
  readonly sendMessage: (content: string, systemPrompt: string) => Promise<void>;
  /** Clears all chat messages. */
  readonly clearMessages: () => void;
}

/** Counter for generating unique message IDs. */
let messageCounter = 0;

/**
 * Generates a unique message ID.
 *
 * @returns A unique string identifier
 */
function generateMessageId(): string {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
}

/**
 * Hook for managing AI chat state and interactions.
 *
 * @returns Chat state and action handlers
 */
export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef<ChatMessage[]>(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const sendMessage = useCallback(async (content: string, systemPrompt: string): Promise<void> => {
    const userMsg: ChatMessage = {
      id: generateMessageId(),
      role: 'user',
      content,
      timestamp: nowIso(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const currentMessages = [...messagesRef.current, userMsg];
      const response = await sendChatMessage(content, currentMessages, systemPrompt);
      const assistantMsg: ChatMessage = {
        id: generateMessageId(),
        role: 'assistant',
        content: response,
        timestamp: nowIso(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      logger.error('Chat send failed', { error: extractErrorMessage(err) });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback((): void => {
    setMessages([]);
  }, []);

  return { messages, isLoading, sendMessage, clearMessages };
}
