import type { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export function Textarea({ label, error, id, className = '', ...props }: TextareaProps) {
  const textareaId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={textareaId} className="text-sm font-medium text-kokoro-text">
        {label}
      </label>
      <textarea
        id={textareaId}
        className={`
          w-full px-4 py-2.5 rounded-xl border bg-white text-kokoro-text text-sm
          placeholder:text-kokoro-muted/60 resize-y min-h-[80px]
          focus:outline-none focus:ring-2 focus:ring-kokoro-primary/40 focus:border-kokoro-primary
          transition-colors duration-200
          ${error ? 'border-red-400' : 'border-kokoro-border'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
