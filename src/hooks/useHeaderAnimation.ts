import { useReducedMotion } from 'framer-motion';

/**
 * Custom hook to generate accessible Framer Motion props
 * for section header entrance animations (slide-up and fade-in),
 * strictly respecting the 'prefers-reduced-motion' media query.
 */
export function useHeaderAnimation() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return {
      initial: { opacity: 1, y: 0 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-60px' },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: {
      duration: 0.55,
      ease: 'easeOut' as const,
    },
  };
}
