import React from 'react'
import { createRoot } from 'react-dom/client'
import { ConsoleView } from '@/components/terminal/ConsoleView'
import '@/styles/app.css'

const root = document.getElementById('console-root')
const dataset = root?.dataset ?? {}
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <ConsoleView
        serverUuid={dataset.serverUuid ?? ''}
        token={dataset.token ?? ''}
        initialEndpoint={dataset.endpoint ?? '/api/blueprint/console'}
      />
    </React.StrictMode>
  )
}
