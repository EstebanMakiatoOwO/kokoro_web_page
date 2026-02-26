interface BadgeProps {
  label: string
  className?: string
}

export function Badge({ label, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase
        bg-kokoro-primary/10 text-kokoro-primary rounded-full
        ${className}
      `}
    >
      {label}
    </span>
  )
}
