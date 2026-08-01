import * as React from 'react'
import { cn } from '@/utils/cn'
import { Icon } from '@/components/ui/Icon'

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  version?: string
  status?: { ok: boolean; label?: string }
}

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, version = 'v1.0.0', status = { ok: true, label: 'All systems operational' }, ...props }, ref) => {
    return (
      <footer ref={ref} className={cn('layout-footer', className)} {...props}>
        <div className="layout-footer-left">
          <span className="layout-footer-version">{version}</span>
          <span className="layout-footer-credits">Powered by Blueprint</span>
        </div>
        <div className="layout-footer-right">
          <a href="https://pterodactyl.io" target="_blank" rel="noopener" className="layout-footer-link">
            Pterodactyl
          </a>
          <a href="https://github.com/pterodactyl/panel" target="_blank" rel="noopener" className="layout-footer-link">
            GitHub
          </a>
          <a href="https://discord.gg/pterodactyl" target="_blank" rel="noopener" className="layout-footer-link">
            Discord
          </a>
          <span className="layout-footer-status">
            <span className={cn('layout-footer-status-dot', status.ok ? 'is-ok' : 'is-down')} />
            {status.label}
          </span>
        </div>
      </footer>
    )
  }
)
Footer.displayName = 'Footer'
