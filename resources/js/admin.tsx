import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppShell } from '@/components/layout/AppShell'
import { Sidebar } from '@/components/layout/Sidebar'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CommandPalette } from '@/components/command/CommandPalette'
import { Toaster } from '@/components/ui/Toaster'
import '@/styles/admin.css'

const root = document.getElementById('blueprint-root')
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <AppShell
        sidebar={<Sidebar groups={window.blueprintAdminNav ?? []} />}
        navbar={
          <Navbar
            user={window.blueprintUser}
            onOpenCommand={() => window.dispatchEvent(new CustomEvent('blueprint:command:open'))}
            showThemeSwitcher
          />
        }
        footer={<Footer />}
        commandPalette={<CommandPalette />}
        toaster={<Toaster />}
      >
        <div id="blueprint-slot" />
      </AppShell>
    </React.StrictMode>
  )
}
