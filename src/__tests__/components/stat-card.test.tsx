import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from '../../components/ui/stat-card';

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard label="Total" value={42} />);
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders trend indicator', () => {
    render(<StatCard label="X" value="100" trend="up" trendText="improving" />);
    expect(screen.getByText(/improving/)).toBeInTheDocument();
  });

  it('has accessible group role', () => {
    render(<StatCard label="Score" value="95" />);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });
});
