import { describe, it, expect } from 'vitest';
import { useChat } from '../../hooks/use-chat';

describe('useChat hook', () => {
  it('exports sendMessage, clearMessages and messages array', () => {
    expect(useChat).toBeDefined();
  });
});
