"use client";

import { useEffect, useRef } from "react";
import { trackScrollDepth } from "@/lib/analytics/events";

type ScrollMilestone = 25 | 50 | 75 | 100;

interface UseScrollDepthOptions {
  enabled?: boolean;

  throttleMs?: number;
}

export function useScrollDepth(options: UseScrollDepthOptions = {}) {
  const { enabled = true, throttleMs = 100 } = options;

  const reachedMilestones = useRef<Set<ScrollMilestone>>(new Set());
  const lastScrollTime = useRef<number>(0);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      const now = Date.now();

      if (now - lastScrollTime.current < throttleMs) {
        return;
      }
      lastScrollTime.current = now;

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) {
        return;
      }

      const scrollPercent = (scrollTop / docHeight) * 100;

      const milestones: ScrollMilestone[] = [25, 50, 75, 100];

      for (const milestone of milestones) {
        if (
          scrollPercent >= milestone &&
          !reachedMilestones.current.has(milestone)
        ) {
          reachedMilestones.current.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [enabled, throttleMs]);

  const reset = () => {
    reachedMilestones.current.clear();
  };

  const getReachedMilestones = (): ScrollMilestone[] => {
    return Array.from(reachedMilestones.current).sort((a, b) => a - b);
  };

  return {
    reset,
    getReachedMilestones,
  };
}

export default useScrollDepth;
