/**
 * Fan Feedback page for collecting user experience ratings.
 *
 * @module FeedbackPage
 */

import { FeedbackForm } from '../components/ui/feedback-form';

/**
 * Renders the fan feedback page.
 *
 * @returns The feedback page element
 */
export function FeedbackPage(): React.JSX.Element {
  return (
    <section>
      <div className="page-header">
        <h1>Fan Feedback</h1>
        <p>Help us improve your stadium experience</p>
      </div>
      <FeedbackForm />
    </section>
  );
}
