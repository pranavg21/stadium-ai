/**
 * Fan feedback submission form with star rating.
 * Validates all input with the shared feedbackSchema.
 *
 * @module FeedbackForm
 */

import { useState, useCallback } from 'react';
import { feedbackSchema } from '../../lib/schemas';
import { logger } from '../../lib/logger';
import { trackFeatureUsage } from '../../lib/firebase-analytics';

/** Feedback category options. */
const CATEGORIES = [
  'general', 'navigation', 'crowd', 'concierge',
  'accessibility', 'transport', 'sustainability', 'operations',
] as const;

/** Maximum star rating value. */
const MAX_RATING = 5;

/**
 * Renders the fan feedback form with star rating and category selection.
 *
 * @returns The feedback form element
 */
export function FeedbackForm(): React.JSX.Element {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState<string>('general');
  const [submitted, setSubmitted] = useState(false);

  const handleCommentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCategory(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent): void => {
    e.preventDefault();
    const result = feedbackSchema.safeParse({ rating, comment: comment || undefined, category });
    if (!result.success) {
      logger.warn('Feedback validation failed', { errors: result.error.message });
      return;
    }
    logger.info('Feedback submitted', { rating, category });
    trackFeatureUsage('feedback_submit', { rating: String(rating), category });
    setSubmitted(true);
    setRating(0);
    setComment('');
    setCategory('general');
  }, [rating, comment, category]);

  if (submitted) {
    return (
      <div className="glass-card feedback-thanks" role="status" aria-live="polite">
        <h2 className="feedback-thanks-heading">Thank You! 🎉</h2>
        <p className="feedback-thanks-text">Your feedback helps us improve the stadium experience.</p>
        <button className="btn btn-secondary" onClick={() => { setSubmitted(false); }} aria-label="Submit another feedback">
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form className="glass-card feedback-form" onSubmit={handleSubmit} aria-label="Fan feedback form">
      <h2 className="feedback-heading">Rate Your Experience</h2>
      <div className="feedback-stars" role="radiogroup" aria-label="Rating">
        {Array.from({ length: MAX_RATING }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            type="button"
            className={`feedback-star ${star <= rating ? 'feedback-star-active' : ''}`}
            onClick={() => { setRating(star); }}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            aria-pressed={star <= rating}
          >
            ★
          </button>
        ))}
      </div>
      <label htmlFor="feedback-category" className="form-label">Category</label>
      <select id="feedback-category" className="chat-input" value={category} onChange={handleCategoryChange}>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
        ))}
      </select>
      <label htmlFor="feedback-comment" className="form-label">Comments (optional)</label>
      <textarea
        id="feedback-comment"
        className="chat-input"
        value={comment}
        onChange={handleCommentChange}
        placeholder="Tell us about your experience..."
        rows={3}
      />
      <button type="submit" className="btn btn-primary" disabled={rating === 0} aria-label="Submit feedback">
        Submit Feedback
      </button>
    </form>
  );
}
