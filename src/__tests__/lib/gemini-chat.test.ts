import { describe, it, expect } from 'vitest';
import { sendChatMessage } from '../../lib/gemini-chat';

describe('gemini-chat', () => {
  it('returns demo response when API is not configured', async () => {
    const result = await sendChatMessage('Where is the food court?', [], 'System prompt');
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
  });

  it('returns food-related demo for food questions', async () => {
    const result = await sendChatMessage('I want to eat something', [], 'System');
    expect(result.toLowerCase()).toContain('food');
  });

  it('returns restroom-related demo for restroom questions', async () => {
    const result = await sendChatMessage('Where is the bathroom?', [], 'System');
    expect(result.toLowerCase()).toContain('restroom');
  });

  it('returns transport-related demo for transport questions', async () => {
    const result = await sendChatMessage('How do I take the metro?', [], 'System');
    expect(result.toLowerCase()).toContain('metro');
  });

  it('returns default demo for unrecognized questions', async () => {
    const result = await sendChatMessage('What is quantum physics?', [], 'System');
    expect(result.length).toBeGreaterThan(0);
  });
});
