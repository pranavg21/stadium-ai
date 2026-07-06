import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OfflinePage } from '../../pages/offline-page';

describe('OfflinePage', () => {
  it('renders h1', () => {
    render(<OfflinePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Offline Mode');
  });

  it('renders emergency info', () => {
    render(<OfflinePage />);
    expect(screen.getByText(/911/)).toBeInTheDocument();
  });

  it('lists offline features', () => {
    render(<OfflinePage />);
    expect(screen.getByText(/Cached stadium map/)).toBeInTheDocument();
  });
});
