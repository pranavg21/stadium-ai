/**
 * Gemini AI client setup. Thin coordinator that initializes
 * the Generative AI SDK. Chat logic is in gemini-chat.ts.
 *
 * @module GeminiClient
 */

import { GoogleGenerativeAI, type GenerativeModel } from '@google/generative-ai';
import { logger } from './logger';

/** API key from environment variables. */
const envKey: unknown = (import.meta.env as Record<string, unknown>)['VITE_GEMINI_API_KEY'];
const API_KEY: string = typeof envKey === 'string' ? envKey : '';

/** Singleton AI client instance. */
let aiClient: GoogleGenerativeAI | null = null;

/**
 * Returns the GoogleGenerativeAI client instance.
 *
 * @returns The AI client
 */
function getClient(): GoogleGenerativeAI {
  if (aiClient === null) {
    aiClient = new GoogleGenerativeAI(API_KEY);
    logger.info('Gemini AI client initialized');
  }
  return aiClient;
}

/**
 * Returns a configured Gemini generative model.
 *
 * @param modelName - The model to use
 * @returns The configured GenerativeModel
 */
export function getModel(modelName: string = 'gemini-2.0-flash'): GenerativeModel {
  return getClient().getGenerativeModel({ model: modelName });
}

/**
 * Checks if the Gemini API key is configured.
 *
 * @returns True if an API key is provided
 */
export function isGeminiConfigured(): boolean {
  return API_KEY.length > 0;
}
