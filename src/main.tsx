/**
 * FILE: main.tsx
 *
 * PURPOSE:
 * React application bootstrap file.
 *
 * RESPONSIBILITY:
 * - Creates the React root.
 * - Loads global styles.
 * - Starts the application.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { LanguageProvider } from './i18n/i18nContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
