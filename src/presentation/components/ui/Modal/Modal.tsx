import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
        <h3 className="font-heading text-lg font-semibold text-kokoro-text mb-4">{title}</h3>
        {children}
      </div>
    </div>
  )
}
