import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AlertCreator } from '../../components/ui/alert-creator';

describe('AlertCreator', () => {
  it('renders form with heading', () => {
    render(<AlertCreator />);
    expect(screen.getByText('Report Incident')).toBeInTheDocument();
  });

  it('renders title input', () => {
    render(<AlertCreator />);
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
  });

  it('renders severity select', () => {
    render(<AlertCreator />);
    expect(screen.getByLabelText('Alert severity')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<AlertCreator />);
    expect(screen.getByLabelText('Submit alert')).toBeInTheDocument();
  });
});
