import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavigatorPage } from '../../pages/navigator-page';
import { STADIUM_ZONES } from '../../lib/stadium-data';

describe('NavigatorPage', () => {
  it('renders heading', () => {
    render(<NavigatorPage zones={STADIUM_ZONES} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('AI Navigator');
  });
});
