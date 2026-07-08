import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmergencyPage } from '../../pages/emergency-page';

describe('EmergencyPage', () => {
  it('renders h1', () => {
    render(<EmergencyPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Emergency & Safety');
  });

  it('renders emergency contacts', () => {
    render(<EmergencyPage />);
    expect(screen.getByText('Stadium Emergency Line')).toBeInTheDocument();
    expect(screen.getByText('911')).toBeInTheDocument();
  });

  it('renders evacuation procedures', () => {
    render(<EmergencyPage />);
    expect(screen.getByText(/Stay calm/i)).toBeInTheDocument();
  });

  it('renders medical station', () => {
    render(<EmergencyPage />);
    expect(screen.getByText('Medical Station')).toBeInTheDocument();
  });
});
