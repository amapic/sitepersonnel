import React from 'react'
import { createRoot } from 'react-dom/client'
import MonComposant from './components/MonComposant'

// Montez React dans un élément existant de votre HTML
const container = document.getElementById('react-root')
if (container) {
  const root = createRoot(container)
  root.render(<MonComposant />)
}