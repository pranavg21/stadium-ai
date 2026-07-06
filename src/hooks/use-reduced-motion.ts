/**
 * React hook for detecting prefers-reduced-motion media query.
 * Used to disable animations for accessibility compliance.
 *
 * @module UseReducedMotion
 */

import { useState, useEffect } from 'react';

/**
 * Hook that detects if the user prefers reduced motion.
 *
 * @returns True if the user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handler = (event: MediaQueryListEvent): void => {
      setPrefersReducedMotion(event.matches);
    };

    query.addEventListener('change', handler);
    return (): void => {
      query.removeEventListener('change', handler);
    };
  }, []);

  return prefersReducedMotion;
}
