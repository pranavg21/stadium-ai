import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CrowdPage } from '../../pages/crowd-page';
import { STADIUM_ZONES } from '../../lib/stadium-data';

describe('CrowdPage', () => {
  it('renders h1', () => {
    render(<CrowdPage zones={STADIUM_ZONES} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Crowd Intelligence');
  });

  it('renders heatmap', () => {
    render(<CrowdPage zones={STADIUM_ZONES} />);
    expect(screen.getByText('Density Heatmap')).toBeInTheDocument();
  });

  it('renders zone status list', () => {
    render(<CrowdPage zones={STADIUM_ZONES} />);
    expect(screen.getByText('Zone Status')).toBeInTheDocument();
  });
});
