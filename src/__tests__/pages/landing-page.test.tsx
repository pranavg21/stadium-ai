import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LandingPage } from '../../pages/landing-page';

describe('LandingPage', () => {
  it('renders h1 with StadiumAI', () => {
    render(<MemoryRouter><LandingPage /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('StadiumAI');
  });

  it('renders feature cards', () => {
    render(<MemoryRouter><LandingPage /></MemoryRouter>);
    expect(screen.getByText('AI Navigator')).toBeInTheDocument();
    expect(screen.getByText('AI Concierge')).toBeInTheDocument();
  });

  it('renders launch button', () => {
    render(<MemoryRouter><LandingPage /></MemoryRouter>);
    expect(screen.getByRole('button', { name: /dashboard/i })).toBeInTheDocument();
  });
});
