import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ZoneMap } from '../../components/ui/zone-map';
import { STADIUM_ZONES } from '../../lib/stadium-data';

describe('ZoneMap', () => {
  it('renders all zone dots', () => {
    render(<ZoneMap zones={STADIUM_ZONES} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(STADIUM_ZONES.length);
  });

  it('has stadium map aria label', () => {
    render(<ZoneMap zones={STADIUM_ZONES} />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', expect.stringContaining('zone map'));
  });
});
