import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RootLayout } from '@layouts/index.ts'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootLayout>
      <App />
    </RootLayout>
  </StrictMode>,
)
