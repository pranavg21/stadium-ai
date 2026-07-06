import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppHeader } from '../../components/layout/app-header';

describe('AppHeader', () => {
  it('renders live simulation status', () => {
    render(<AppHeader isSimulating={true} onToggleSimulation={() => {}} />);
    expect(screen.getByText('Live Simulation')).toBeInTheDocument();
  });
});
