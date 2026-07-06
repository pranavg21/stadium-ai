/**
 * Skip-to-content accessibility link. Allows keyboard users
 * to skip navigation and jump directly to main content.
 *
 * @module SkipLink
 */

import { MAIN_CONTENT_ID } from '../../lib/constants';

/**
 * Renders the skip-to-content accessibility link.
 *
 * @returns The skip link element
 */
export function SkipLink(): React.JSX.Element {
  return (
    <a href={`#${MAIN_CONTENT_ID}`} className="skip-link" aria-label="Skip to main content">
      Skip to content
    </a>
  );
}
