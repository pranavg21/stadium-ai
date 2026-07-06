import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExportButton } from '../../components/ui/export-button';

describe('ExportButton', () => {
  it('renders JSON export option', () => {
    render(<ExportButton data={{}} label="test" />);
    expect(screen.getByRole('button', { name: /Export test as JSON/i })).toBeInTheDocument();
  });
});
