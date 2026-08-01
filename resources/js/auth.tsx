import React from 'react'
import { createRoot } from 'react-dom/client'
import { CommandPalette } from '@/components/command/CommandPalette'
import '@/styles/auth.css'

const slot = document.getElementById('blueprint-slot')
if (slot) {
  createRoot(slot).render(
    <React.StrictMode>
      <CommandPalette />
    </React.StrictMode>
  )
}
