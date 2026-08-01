import React from 'react'
import { createRoot } from 'react-dom/client'
import { FileBrowser } from '@/components/servers/FileBrowser'
import '@/styles/app.css'

const root = document.getElementById('blueprint-slot')
const serverUuid = root?.dataset.server ?? ''
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <FileBrowser serverUuid={serverUuid} />
    </React.StrictMode>
  )
}
