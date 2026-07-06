import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AccessibilityPage } from '../../pages/accessibility-page';

describe('AccessibilityPage', () => {
  it('renders h1', () => {
    render(<AccessibilityPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Accessibility Hub');
  });

  it('renders facilities', () => {
    render(<AccessibilityPage />);
    expect(screen.getByText(/Wheelchair Seating/)).toBeInTheDocument();
    expect(screen.getByText(/Sensory Room/)).toBeInTheDocument();
  });

  it('renders assistance section', () => {
    render(<AccessibilityPage />);
    expect(screen.getByText('Accessibility Assistance')).toBeInTheDocument();
  });
});
