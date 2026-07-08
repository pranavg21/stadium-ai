import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeedbackPage } from '../../pages/feedback-page';

describe('FeedbackPage', () => {
  it('renders h1', () => {
    render(<FeedbackPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Fan Feedback');
  });

  it('renders the feedback form', () => {
    render(<FeedbackPage />);
    expect(screen.getByText('Rate Your Experience')).toBeInTheDocument();
  });
});
