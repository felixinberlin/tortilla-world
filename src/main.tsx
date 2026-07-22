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
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
