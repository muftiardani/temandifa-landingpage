import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
};

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
};

export const reducedFadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const reducedNoMotion: Variants = {
  initial: {},
  animate: {},
};

export const defaultTransition = {
  duration: 0.6,
  ease: "easeOut" as const,
};

export const reducedTransition = {
  duration: 0,
};

export const viewportOptions = {
  once: true,
  margin: "-100px",
};

export function getMotionVariant(
  shouldReduce: boolean,
  variant: Variants
): Variants {
  if (shouldReduce) {
    return reducedFadeIn;
  }
  return variant;
}

export function getTransition(shouldReduce: boolean) {
  return shouldReduce ? reducedTransition : defaultTransition;
}
