import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RootLayout } from '@layouts/index.ts'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <RootLayout>
        <App />
      </RootLayout>
    </BrowserRouter>
  </StrictMode>,
)
