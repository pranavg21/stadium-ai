import { describe, it, expect, vi } from 'vitest';
import { logger } from '../../lib/logger';

describe('logger', () => {
  it('logs info messages to stdout', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    logger.info('test message');
    expect(spy).toHaveBeenCalledOnce();
    const parsed = JSON.parse(spy.mock.calls[0]![0] as string);
    expect(parsed.severity).toBe('INFO');
    expect(parsed.message).toBe('test message');
    expect(parsed.timestamp).toBeDefined();
    spy.mockRestore();
  });

  it('logs error messages to stderr', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    logger.error('error msg');
    expect(spy).toHaveBeenCalledOnce();
    const parsed = JSON.parse(spy.mock.calls[0]![0] as string);
    expect(parsed.severity).toBe('ERROR');
    spy.mockRestore();
  });

  it('includes metadata in log entries', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    logger.debug('debug', { component: 'test' });
    const parsed = JSON.parse(spy.mock.calls[0]![0] as string);
    expect(parsed.component).toBe('test');
    spy.mockRestore();
  });

  it('logs critical to stderr', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    logger.critical('critical issue');
    const parsed = JSON.parse(spy.mock.calls[0]![0] as string);
    expect(parsed.severity).toBe('CRITICAL');
    spy.mockRestore();
  });

  it('logs warn to stdout', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    logger.warn('warning');
    const parsed = JSON.parse(spy.mock.calls[0]![0] as string);
    expect(parsed.severity).toBe('WARNING');
    spy.mockRestore();
  });
});
