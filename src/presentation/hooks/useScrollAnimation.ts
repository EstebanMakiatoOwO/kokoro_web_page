import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { gsap, ScrollTrigger } from '@infrastructure/gsap/index.ts'

/**
 * Runs a GSAP animation scoped to a section ref.
 * Automatically cleans up via gsap.context().revert() + ScrollTrigger.kill().
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  setup: () => void,
  deps: unknown[] = []
): RefObject<T | null> {
  const sectionRef = useRef<T>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      setup()
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return sectionRef
}
