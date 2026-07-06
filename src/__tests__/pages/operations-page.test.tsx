import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OperationsPage } from '../../pages/operations-page';
import { STADIUM_ZONES } from '../../lib/stadium-data';

describe('OperationsPage', () => {
  it('renders heading', () => {
    render(<OperationsPage zones={STADIUM_ZONES} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Operations Center');
  });
});
