import { describe, it, expect } from 'vitest';
import { formatDate, formatTime, formatRelativeTime, formatDuration, nowIso } from '../../lib/date-helpers';

describe('formatDate', () => {
  it('formats ISO string to readable date', () => {
    const result = formatDate('2026-07-10T20:00:00Z');
    expect(result).toContain('2026');
    expect(result).toContain('July');
  });
});

describe('formatTime', () => {
  it('formats ISO string to time', () => {
    const result = formatTime('2026-07-10T20:00:00Z');
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('formatRelativeTime', () => {
  it('returns "Just now" for recent timestamps', () => {
    const result = formatRelativeTime(new Date().toISOString());
    expect(result).toBe('Just now');
  });

  it('returns minutes ago for older timestamps', () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60_000).toISOString();
    const result = formatRelativeTime(fiveMinAgo);
    expect(result).toContain('m ago');
  });
});

describe('formatDuration', () => {
  it('formats minutes under 60', () => {
    expect(formatDuration(45)).toBe('45 min');
  });

  it('formats exact hours', () => {
    expect(formatDuration(120)).toBe('2h');
  });

  it('formats hours and minutes', () => {
    expect(formatDuration(90)).toBe('1h 30m');
  });
});

describe('nowIso', () => {
  it('returns a valid ISO string', () => {
    const result = nowIso();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});
