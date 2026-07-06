import { describe, it, expect } from 'vitest';
import { chatMessageSchema, navigationRequestSchema, zoneUpdateSchema, alertCreationSchema, feedbackSchema, sanitizedInputSchema } from '../../lib/schemas';

describe('chatMessageSchema', () => {
  it('accepts valid message', () => {
    const result = chatMessageSchema.safeParse({ content: 'Hello', language: 'en' });
    expect(result.success).toBe(true);
  });

  it('rejects empty content', () => {
    const result = chatMessageSchema.safeParse({ content: '' });
    expect(result.success).toBe(false);
  });

  it('defaults language to en', () => {
    const result = chatMessageSchema.parse({ content: 'Hi' });
    expect(result.language).toBe('en');
  });

  it('rejects message exceeding max length', () => {
    const result = chatMessageSchema.safeParse({ content: 'a'.repeat(2001) });
    expect(result.success).toBe(false);
  });
});

describe('navigationRequestSchema', () => {
  it('accepts valid request', () => {
    const result = navigationRequestSchema.safeParse({ from: 'zone-a', to: 'zone-b' });
    expect(result.success).toBe(true);
  });

  it('defaults accessible to false', () => {
    const result = navigationRequestSchema.parse({ from: 'a', to: 'b' });
    expect(result.accessible).toBe(false);
  });

  it('rejects empty from', () => {
    const result = navigationRequestSchema.safeParse({ from: '', to: 'b' });
    expect(result.success).toBe(false);
  });
});

describe('zoneUpdateSchema', () => {
  it('accepts valid update', () => {
    const result = zoneUpdateSchema.safeParse({ zoneId: 'z1', occupancy: 50 });
    expect(result.success).toBe(true);
  });

  it('rejects occupancy over 100', () => {
    const result = zoneUpdateSchema.safeParse({ zoneId: 'z1', occupancy: 101 });
    expect(result.success).toBe(false);
  });

  it('rejects negative occupancy', () => {
    const result = zoneUpdateSchema.safeParse({ zoneId: 'z1', occupancy: -1 });
    expect(result.success).toBe(false);
  });
});

describe('alertCreationSchema', () => {
  it('accepts valid alert', () => {
    const result = alertCreationSchema.safeParse({ title: 'Fire', message: 'Zone A', severity: 'critical' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid severity', () => {
    const result = alertCreationSchema.safeParse({ title: 'X', message: 'Y', severity: 'unknown' });
    expect(result.success).toBe(false);
  });
});

describe('feedbackSchema', () => {
  it('accepts valid feedback', () => {
    const result = feedbackSchema.safeParse({ rating: 5, category: 'navigation' });
    expect(result.success).toBe(true);
  });

  it('rejects rating below 1', () => {
    const result = feedbackSchema.safeParse({ rating: 0, category: 'general' });
    expect(result.success).toBe(false);
  });

  it('rejects rating above 5', () => {
    const result = feedbackSchema.safeParse({ rating: 6, category: 'general' });
    expect(result.success).toBe(false);
  });
});

describe('sanitizedInputSchema', () => {
  it('trims whitespace', () => {
    const result = sanitizedInputSchema.parse('  hello  ');
    expect(result).toBe('hello');
  });
});
