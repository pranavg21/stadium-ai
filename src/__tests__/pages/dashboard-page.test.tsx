import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardPage } from '../../pages/dashboard-page';
import { STADIUM_ZONES } from '../../lib/stadium-data';

describe('DashboardPage', () => {
  it('renders h1', () => {
    render(<DashboardPage zones={STADIUM_ZONES} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Stadium Dashboard');
  });

  it('renders stat cards', () => {
    render(<DashboardPage zones={STADIUM_ZONES} />);
    expect(screen.getByText('Total Attendance')).toBeInTheDocument();
    expect(screen.getByText('Avg Occupancy')).toBeInTheDocument();
  });

  it('renders zone map', () => {
    render(<DashboardPage zones={STADIUM_ZONES} />);
    expect(screen.getByText('Live Zone Map')).toBeInTheDocument();
  });
});
