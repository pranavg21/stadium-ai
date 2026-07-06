import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSkeleton } from '../../components/ui/loading-skeleton';

describe('LoadingSkeleton', () => {
  it('renders with loading status', () => {
    render(<LoadingSkeleton />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has aria-busy', () => {
    render(<LoadingSkeleton />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
  });
});
