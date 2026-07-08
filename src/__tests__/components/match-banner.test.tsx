import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MatchBanner } from '../../components/ui/match-banner';

describe('MatchBanner', () => {
  it('renders team names', () => {
    render(<MatchBanner />);
    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  it('renders vs separator', () => {
    render(<MatchBanner />);
    expect(screen.getByText('vs')).toBeInTheDocument();
  });

  it('has banner role with label', () => {
    render(<MatchBanner />);
    expect(screen.getByRole('banner', { name: /current match/i })).toBeInTheDocument();
  });
});
