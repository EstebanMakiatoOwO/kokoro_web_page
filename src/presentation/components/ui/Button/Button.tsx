import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { springTransition } from '@animations/index.ts'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-kokoro-primary text-white hover:bg-kokoro-primary-dark px-8 py-3 rounded-full',
  secondary:
    'border border-kokoro-border text-kokoro-text hover:border-kokoro-primary px-8 py-3 rounded-full',
  ghost:
    'text-kokoro-muted hover:text-kokoro-text px-4 py-2',
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}: ButtonProps) {
  return (
    <m.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium text-sm tracking-wide
        transition-colors duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kokoro-primary
        ${VARIANT_CLASSES[variant]} ${className}
      `}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={springTransition}
    >
      {children}
    </m.button>
  )
}
