import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressRing } from '../../components/ui/progress-ring';

describe('ProgressRing', () => {
  it('renders with progress value', () => {
    render(<ProgressRing progress={75} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets aria-valuenow', () => {
    render(<ProgressRing progress={50} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
  });

  it('displays percentage text', () => {
    render(<ProgressRing progress={80} />);
    expect(screen.getByText('80%')).toBeInTheDocument();
  });
});
