import React from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/app.css'

const slots = document.querySelectorAll<HTMLElement>('[data-bp-component]')
slots.forEach((slot) => {
  const component = slot.dataset.bpComponent
  if (!component) return
  const props = slot.dataset.bpProps ? JSON.parse(slot.dataset.bpProps) : {}
  // Each blueprint component registers itself and the data attribute selects which one to mount.
  const factory = (window as any).blueprintComponents?.[component]
  if (!factory) return
  createRoot(slot).render(React.createElement(factory, props))
})
