import type { Transition } from 'framer-motion'

/** Default tween: 0.5s with custom ease */
export const defaultTransition: Transition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
}

/** Spring: for interactive elements (buttons, cards) */
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
}

/** Hero: slow dramatic entrance, 0.9s */
export const heroTransition: Transition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
}

/** Snap: fast micro-interaction, 0.2s */
export const snapTransition: Transition = {
  duration: 0.2,
  ease: 'easeOut',
}
