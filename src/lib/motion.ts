import { Variants } from "motion/react";

/**
 * CV Fácil - Motion System Foundation
 * Centralized animations for world-class consistency.
 */

export const springPhysics = {
  stiffness: 260,
  damping: 20,
  mass: 1,
};

export const transitionSm = {
  type: "spring" as const,
  ...springPhysics,
};

export const transitionMd = {
  type: "spring" as const,
  stiffness: 200,
  damping: 25,
};

// Variantes Globais
export const slideUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: transitionSm },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: transitionSm },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: transitionSm },
};

// Page Transition Variant for App.tsx
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};
