/**
 * useScrollPosition Hook
 * Tracks the current scroll position
 */

'use client';

import { useState, useEffect } from 'react';

/**
 * useScrollPosition Hook
 * Returns the current vertical scroll position
 * 
 * @returns number - Current scroll Y position in pixels
 * 
 * @example
 * const scrollY = useScrollPosition();
 * const isScrolled = scrollY > 100;
 */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}
