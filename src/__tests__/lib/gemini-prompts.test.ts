import { describe, it, expect } from 'vitest';
import { CONCIERGE_SYSTEM_PROMPT, NAVIGATOR_SYSTEM_PROMPT, OPERATIONS_SYSTEM_PROMPT, buildContextPrompt, formatZoneDataForPrompt } from '../../lib/gemini-prompts';

describe('system prompts', () => {
  it('concierge prompt mentions multilingual', () => {
    expect(CONCIERGE_SYSTEM_PROMPT.toLowerCase()).toContain('multilingual');
  });

  it('navigator prompt mentions navigation', () => {
    expect(NAVIGATOR_SYSTEM_PROMPT.toLowerCase()).toContain('navigation');
  });

  it('operations prompt mentions staff', () => {
    expect(OPERATIONS_SYSTEM_PROMPT.toLowerCase()).toContain('staff');
  });
});

describe('buildContextPrompt', () => {
  it('appends zone data to base prompt', () => {
    const result = buildContextPrompt('Base prompt', 'Zone A: 50%');
    expect(result).toContain('Base prompt');
    expect(result).toContain('Zone A: 50%');
  });
});

describe('formatZoneDataForPrompt', () => {
  it('formats zones into readable string', () => {
    const zones = [{ name: 'Gate A', occupancy: 75, status: 'crowded' }];
    const result = formatZoneDataForPrompt(zones);
    expect(result).toContain('Gate A');
    expect(result).toContain('75%');
    expect(result).toContain('crowded');
  });

  it('handles empty array', () => {
    expect(formatZoneDataForPrompt([])).toBe('');
  });
});
