import type { LucideIcon } from 'lucide-react'

interface IconProps {
  icon: LucideIcon
  size?: number
  className?: string
  strokeWidth?: number
  'aria-hidden'?: boolean
}

export function Icon({
  icon: LucideComponent,
  size = 20,
  className = '',
  strokeWidth = 1.5,
  'aria-hidden': ariaHidden = true,
}: IconProps) {
  return (
    <LucideComponent
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden={ariaHidden}
    />
  )
}
