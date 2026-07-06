import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConciergePage } from '../../pages/concierge-page';
import { STADIUM_ZONES } from '../../lib/stadium-data';

describe('ConciergePage', () => {
  it('renders heading', () => {
    render(<ConciergePage zones={STADIUM_ZONES} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('AI Concierge');
  });
});
