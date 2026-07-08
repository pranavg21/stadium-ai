import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AlertFeed } from '../../components/ui/alert-feed';

describe('AlertFeed', () => {
  it('renders heading with alert count', () => {
    render(<AlertFeed />);
    expect(screen.getByText(/active alerts/i)).toBeInTheDocument();
  });

  it('renders demo alerts', () => {
    render(<AlertFeed />);
    expect(screen.getByText(/High Crowd Density/i)).toBeInTheDocument();
  });

  it('has log role for accessibility', () => {
    render(<AlertFeed />);
    expect(screen.getByRole('log', { name: /operational alerts/i })).toBeInTheDocument();
  });
});
