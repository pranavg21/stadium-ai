import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeedbackForm } from '../../components/ui/feedback-form';

describe('FeedbackForm', () => {
  it('renders heading', () => {
    render(<FeedbackForm />);
    expect(screen.getByText('Rate Your Experience')).toBeInTheDocument();
  });

  it('renders 5 star buttons', () => {
    render(<FeedbackForm />);
    const stars = screen.getAllByText('★');
    expect(stars).toHaveLength(5);
  });

  it('renders category select', () => {
    render(<FeedbackForm />);
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
  });

  it('renders disabled submit when no rating', () => {
    render(<FeedbackForm />);
    const submitBtn = screen.getByLabelText('Submit feedback');
    expect(submitBtn).toBeDisabled();
  });
});
