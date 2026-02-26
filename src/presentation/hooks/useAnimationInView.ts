import { useRef } from 'react'
import { useInView } from 'framer-motion'
import type { RefObject } from 'react'

interface UseAnimationInViewOptions {
  /** Only trigger once (default: true) */
  once?: boolean
  /** Margin around viewport intersection (default: '-80px') */
  margin?: string
}

interface UseAnimationInViewReturn<T extends Element> {
  ref: RefObject<T | null>
  isInView: boolean
}

export function useAnimationInView<T extends Element = HTMLDivElement>(
  options?: UseAnimationInViewOptions
): UseAnimationInViewReturn<T> {
  const ref = useRef<T>(null)
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin ?? '-80px',
  })

  return { ref, isInView }
}
