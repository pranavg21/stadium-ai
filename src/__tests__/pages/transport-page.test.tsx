import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransportPage } from '../../pages/transport-page';

describe('TransportPage', () => {
  it('renders h1', () => {
    render(<TransportPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Smart Transport');
  });

  it('renders transport options', () => {
    render(<TransportPage />);
    expect(screen.getByText(/NJ Transit/)).toBeInTheDocument();
  });
});
