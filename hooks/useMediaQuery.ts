/**
 * Custom React Hooks
 * Reusable hooks for common functionality
 */

'use client';

import { useState, useEffect } from 'react';

/**
 * useMediaQuery Hook
 * Detects if a media query matches
 * 
 * @param query - CSS media query string
 * @returns boolean indicating if the query matches
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);
    
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
