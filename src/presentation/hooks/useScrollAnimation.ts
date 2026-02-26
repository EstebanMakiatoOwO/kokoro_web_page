import { useEffect } from 'react'
import type { RefObject } from 'react'
import { gsap, ScrollTrigger } from '@infrastructure/gsap/index.ts'

/**
 * Runs a GSAP animation scoped to a section ref.
 * Automatically cleans up via gsap.context().revert() + ScrollTrigger.kill().
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  setup: () => void,
  deps: unknown[] = []
): void {
  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      setup()
    }, ref)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
