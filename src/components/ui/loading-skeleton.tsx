/**
 * Loading skeleton component for Suspense fallback.
 *
 * @module LoadingSkeleton
 */

/**
 * Renders a loading skeleton placeholder.
 *
 * @returns The loading skeleton element
 */
export function LoadingSkeleton(): React.JSX.Element {
  return (
    <div role="status" aria-label="Loading content" aria-busy="true" className="skeleton-pad">
      <div className="skeleton skeleton-text skeleton-w40" />
      <div className="skeleton skeleton-text skeleton-w70" />
      <div className="skeleton skeleton-text skeleton-w55" />
      <div className="skeleton skeleton-card skeleton-mt16" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
