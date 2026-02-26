import type { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger'

/** Fade up on scroll enter */
export function scrollFadeUp(
  trigger: Element,
  options?: { y?: number; duration?: number }
) {
  const y = options?.y ?? 50
  const duration = options?.duration ?? 0.8
  return {
    from: { opacity: 0, y, duration, ease: 'power3.out' } as Record<string, unknown>,
    scrollTrigger: {
      trigger,
      start: 'top 88%',
      toggleActions: 'play none none none',
    } satisfies ScrollTriggerPlugin.Vars,
  }
}

/** Parallax drift effect for images */
export function parallaxDrift(
  trigger: Element,
  options?: { yPercent?: number; scrub?: number }
) {
  const yPercent = options?.yPercent ?? 15
  const scrub = options?.scrub ?? 1.5
  return {
    to: { yPercent, ease: 'none' } as Record<string, unknown>,
    scrollTrigger: {
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub,
    } satisfies ScrollTriggerPlugin.Vars,
  }
}

/** Scale in on scroll enter */
export function scrollScaleIn(
  trigger: Element,
  options?: { scale?: number; duration?: number }
) {
  const scale = options?.scale ?? 0.92
  const duration = options?.duration ?? 0.8
  return {
    from: { opacity: 0, scale, duration, ease: 'power3.out' } as Record<string, unknown>,
    scrollTrigger: {
      trigger,
      start: 'top 85%',
      toggleActions: 'play none none none',
    } satisfies ScrollTriggerPlugin.Vars,
  }
}
