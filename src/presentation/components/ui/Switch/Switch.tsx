interface SwitchProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function Switch({ label, checked, onChange, disabled = false }: SwitchProps) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative w-11 h-6 rounded-full transition-colors duration-200
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kokoro-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          ${checked ? 'bg-kokoro-primary' : 'bg-kokoro-border'}
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow
            transition-transform duration-200
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
      <span className="text-sm text-kokoro-text">{label}</span>
    </label>
  )
}
