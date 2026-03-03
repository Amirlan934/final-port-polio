/**
 * Global motion configuration for professional, minimal animations
 * Respects user's reduced motion preferences
 */

// Professional ease-out curve
export const easing = [0.22, 1, 0.36, 1];

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Motion variants with accessibility support
export const getMotionProps = (
  initial: Record<string, any>,
  animate: Record<string, any>,
  transition: Record<string, any> = {}
) => {
  if (prefersReducedMotion()) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.01 },
    };
  }

  return {
    initial,
    animate,
    transition: { ease: easing, ...transition },
  };
};

// Standardized motion configurations
export const motionConfig = {
  // Subtle fade and rise (12px)
  fadeUp: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: easing },
  },

  // Hero entrance (700ms)
  heroFade: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: easing },
  },

  // Card scale with fade
  cardReveal: {
    initial: { opacity: 0, y: 12, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.5, ease: easing },
  },

  // Button micro-interaction
  button: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2, ease: easing },
  },

  // Navigation items
  nav: {
    initial: { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: easing },
  },
};

// Stagger children utility
export const staggerChildren = (index: number, baseDelay = 0) => {
  return prefersReducedMotion() ? 0 : baseDelay + index * 0.08;
};

// Advanced animation variants
export const animations = {
  // Hero text stagger
  heroText: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: easing },
  },

  // Scroll-triggered reveal
  scrollReveal: {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6, ease: easing },
  },

  // Card hover lift
  cardHover: {
    rest: { y: 0, scale: 1 },
    hover: { 
      y: -8, 
      scale: 1.01,
      transition: { duration: 0.4, ease: easing }
    },
  },

  // Image scale on hover
  imageScale: {
    rest: { scale: 1 },
    hover: { 
      scale: 1.04,
      transition: { duration: 0.6, ease: easing }
    },
  },

  // Typography fade with letter spacing
  typographyReveal: {
    initial: { opacity: 0, letterSpacing: '0.05em' },
    animate: { opacity: 1, letterSpacing: '0em' },
    transition: { duration: 0.8, ease: easing },
  },

  // Footer fade
  footerFade: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: '0px' },
    transition: { duration: 1, ease: easing },
  },
};