/**
 * ============================================================================
 * ROBOFEST '26 — REACT SPA CLIENT ENTRY POINT
 * File: src/main.tsx
 * Description: Mounts the React 19 application tree onto the root DOM container.
 * ============================================================================
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('CRITICAL: Root container DOM element #root not found.')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
