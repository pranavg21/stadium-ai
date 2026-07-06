import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkipLink } from '../../components/layout/skip-link';

describe('SkipLink', () => {
  it('renders skip to content link', () => {
    render(<SkipLink />);
    const link = screen.getByText('Skip to content');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('has proper aria label', () => {
    render(<SkipLink />);
    expect(screen.getByLabelText('Skip to main content')).toBeInTheDocument();
  });
});
