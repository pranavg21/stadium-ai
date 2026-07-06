import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SustainabilityPage } from '../../pages/sustainability-page';

describe('SustainabilityPage', () => {
  it('renders h1', () => {
    render(<SustainabilityPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sustainability');
  });

  it('renders progress rings', () => {
    render(<SustainabilityPage />);
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBe(4);
  });

  it('renders initiatives', () => {
    render(<SustainabilityPage />);
    expect(screen.getByText('Sustainability Initiatives')).toBeInTheDocument();
  });
});
