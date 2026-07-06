/**
 * Input sanitization utilities for XSS prevention and input cleaning.
 * Strips HTML tags, blocks javascript: protocol, enforces max length.
 *
 * @module InputSanitizer
 */

import { MAX_INPUT_LENGTH } from './constants';

/**
 * Sanitizes user input by stripping HTML tags, blocking dangerous protocols,
 * and enforcing maximum length.
 *
 * @param input - The raw user input string
 * @param maxLength - Optional custom max length (defaults to MAX_INPUT_LENGTH)
 * @returns The sanitized input string
 */
export function sanitizeInput(input: string, maxLength: number = MAX_INPUT_LENGTH): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates that a string does not contain HTML tags.
 *
 * @param input - The string to check
 * @returns True if the input is free of HTML tags
 */
export function isCleanInput(input: string): boolean {
  return !/<[^>]*>/.test(input);
}

/**
 * Escapes special HTML characters to prevent XSS in rendered text.
 *
 * @param text - The text to escape
 * @returns The HTML-escaped string
 */
export function escapeHtml(text: string): string {
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return text.replace(/[&<>"']/g, (char) => escapeMap[char] ?? char);
}
