import { describe, it, expect } from 'vitest';
import { extractErrorMessage, createErrorResponse } from '../../lib/error-helpers';

describe('extractErrorMessage', () => {
  it('extracts message from Error instances', () => {
    expect(extractErrorMessage(new Error('test error'))).toBe('test error');
  });

  it('converts strings to string', () => {
    expect(extractErrorMessage('string error')).toBe('string error');
  });

  it('converts numbers to string', () => {
    expect(extractErrorMessage(42)).toBe('42');
  });

  it('converts null to string', () => {
    expect(extractErrorMessage(null)).toBe('null');
  });

  it('converts undefined to string', () => {
    expect(extractErrorMessage(undefined)).toBe('undefined');
  });
});

describe('createErrorResponse', () => {
  it('creates response with message only', () => {
    const result = createErrorResponse('Something failed');
    expect(result.error).toBe('Something failed');
    expect(result.code).toBeUndefined();
  });

  it('creates response with message and code', () => {
    const result = createErrorResponse('Not found', 'NOT_FOUND');
    expect(result.error).toBe('Not found');
    expect(result.code).toBe('NOT_FOUND');
  });
});
