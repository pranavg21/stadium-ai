import { describe, it, expect } from 'vitest';
import { sanitizeInput, isCleanInput, escapeHtml } from '../../lib/input-sanitizer';

describe('sanitizeInput', () => {
  it('strips HTML tags', () => {
    expect(sanitizeInput('<script>alert("xss")</script>Hello')).toBe('alert("xss")Hello');
  });

  it('blocks javascript: protocol', () => {
    expect(sanitizeInput('javascript:alert(1)')).toBe('alert(1)');
  });

  it('blocks event handlers', () => {
    expect(sanitizeInput('onerror=alert(1)')).toBe('alert(1)');
  });

  it('trims whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });

  it('enforces max length', () => {
    expect(sanitizeInput('abcdefghij', 5)).toBe('abcde');
  });

  it('handles empty string', () => {
    expect(sanitizeInput('')).toBe('');
  });
});

describe('isCleanInput', () => {
  it('returns true for clean text', () => {
    expect(isCleanInput('Hello world')).toBe(true);
  });

  it('returns false for HTML', () => {
    expect(isCleanInput('<div>test</div>')).toBe(false);
  });
});

describe('escapeHtml', () => {
  it('escapes ampersand', () => {
    expect(escapeHtml('a&b')).toBe('a&amp;b');
  });

  it('escapes angle brackets', () => {
    expect(escapeHtml('<div>')).toBe('&lt;div&gt;');
  });

  it('escapes quotes', () => {
    expect(escapeHtml('"hello"')).toBe('&quot;hello&quot;');
  });
});
