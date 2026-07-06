/**
 * Gemini AI chat module with multi-turn context window.
 * Sends last N messages as context for continuity.
 * Includes demo fallback for when API quota is exhausted.
 *
 * @module GeminiChat
 */

import { getModel, isGeminiConfigured } from './gemini-client';
import { logger } from './logger';
import { extractErrorMessage } from './error-helpers';
import { CHAT_CONTEXT_WINDOW } from './constants';
import type { ChatMessage } from './types';

/** Demo fallback answers keyed by detected topic. */
const DEMO_ANSWERS: Record<string, string> = {
  food: 'The nearest food court is in Zone C (Concession West). Current wait time is approximately 8 minutes. Zone F (Concession East) has shorter queues at about 4 minutes.',
  restroom: 'The closest restrooms are in Zone D, just past the main concourse. They are currently at moderate capacity. Accessible restrooms are available near Gate 3.',
  parking: 'Parking Lot A (North) is at 78% capacity. Lot C (South) has the most availability at 45%. Pre-booked spots are in Section P1-P3.',
  seat: 'To find your seat, follow the signs for your section number. Stewards at each gate entrance can guide you. The StadiumAI Navigator can provide turn-by-turn directions.',
  emergency: 'For emergencies, contact the nearest steward or call the emergency hotline displayed on stadium screens. Medical stations are located at Zones B, E, and H.',
  transport: 'Metro Line 3 connects directly to the stadium. After the match, buses depart every 5 minutes from Gate 7. Rideshare pickup is at Zone K.',
  default: 'I can help you with navigation, finding food and restrooms, parking information, transportation, accessibility needs, and general stadium information. What would you like to know?',
};

/**
 * Detects the topic from user message for demo fallback.
 *
 * @param message - The user message to analyze
 * @returns The detected topic key
 */
function detectTopic(message: string): string {
  const lower = message.toLowerCase();
  const topicKeywords: Record<string, readonly string[]> = {
    food: ['food', 'eat', 'drink', 'restaurant', 'snack', 'hungry', 'concession'],
    restroom: ['restroom', 'bathroom', 'toilet', 'washroom', 'wc'],
    parking: ['parking', 'car', 'park', 'drive', 'lot'],
    seat: ['seat', 'section', 'row', 'find my', 'where is my'],
    emergency: ['emergency', 'medical', 'help', 'doctor', 'first aid'],
    transport: ['metro', 'bus', 'taxi', 'uber', 'train', 'transport', 'ride'],
  };

  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return topic;
    }
  }
  return 'default';
}

/**
 * Sends a message to Gemini AI with multi-turn context.
 * Falls back to demo answers if API is unavailable.
 *
 * @param userMessage - The user's message
 * @param history - Previous chat messages for context
 * @param systemPrompt - The system prompt to use
 * @returns The AI response text
 */
export async function sendChatMessage(
  userMessage: string,
  history: readonly ChatMessage[],
  systemPrompt: string
): Promise<string> {
  if (!isGeminiConfigured()) {
    return getDemoResponse(userMessage);
  }

  try {
    const model = getModel();
    const recentHistory = history.slice(-CHAT_CONTEXT_WINDOW);
    const contextMessages = recentHistory
      .map((m) => `${m.role}: ${m.content}`)
      .join('\n');

    const fullPrompt = [
      systemPrompt,
      contextMessages.length > 0 ? `\nConversation:\n${contextMessages}` : '',
      `\nuser: ${userMessage}`,
    ].join('');

    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();
    logger.info('Gemini response received', { length: text.length });
    return text;
  } catch (error: unknown) {
    logger.error('Gemini chat failed', { error: extractErrorMessage(error) });
    return getDemoResponse(userMessage);
  }
}

/**
 * Returns a contextual demo response based on message topic.
 *
 * @param message - The user message to respond to
 * @returns A demo response string
 */
function getDemoResponse(message: string): string {
  const topic = detectTopic(message);
  return DEMO_ANSWERS[topic] ?? DEMO_ANSWERS['default'] ?? '';
}
