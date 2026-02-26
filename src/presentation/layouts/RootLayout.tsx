import type { ReactNode } from 'react'
import { MotionProvider } from '@infrastructure/framerMotion/index.ts'

interface RootLayoutProps {
  children: ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <MotionProvider>
      {children}
    </MotionProvider>
  )
}
