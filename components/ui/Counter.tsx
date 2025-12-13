"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}

export default function Counter({ 
  end, 
  duration = 2000, 
  decimals = 0,
  suffix = ""
}: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(easeProgress * end);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}{suffix}
    </span>
  );
}
