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
    <div role="status" aria-label="Loading content" aria-busy="true" style={{ padding: '24px' }}>
      <div className="skeleton skeleton-text" style={{ width: '40%', height: '24px' }} />
      <div className="skeleton skeleton-text" style={{ width: '70%' }} />
      <div className="skeleton skeleton-text" style={{ width: '55%' }} />
      <div className="skeleton skeleton-card" style={{ marginTop: '16px' }} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
