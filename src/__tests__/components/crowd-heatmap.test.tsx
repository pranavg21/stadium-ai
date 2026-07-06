import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CrowdHeatmap } from '../../components/ui/crowd-heatmap';
import { STADIUM_ZONES } from '../../lib/stadium-data';

describe('CrowdHeatmap', () => {
  it('renders cells for all zones', () => {
    render(<CrowdHeatmap zones={STADIUM_ZONES} />);
    const cells = screen.getAllByRole('gridcell');
    expect(cells.length).toBe(STADIUM_ZONES.length);
  });

  it('has grid role', () => {
    render(<CrowdHeatmap zones={STADIUM_ZONES} />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });
});
