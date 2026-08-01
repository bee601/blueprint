import * as React from 'react'
import { cn } from '@/utils/cn'
import { Icon } from '@/components/ui/Icon'
import { useSettings } from '@/hooks/useSettings'

type Theme = 'light' | 'dark' | 'system'

interface ThemeSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: Theme
  onChange?: (theme: Theme) => void
}

export const ThemeSwitcher = React.forwardRef<HTMLDivElement, ThemeSwitcherProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const { mode, setMode } = useSettings()
    const current = value ?? mode

    const apply = (theme: Theme) => {
      const resolved = theme === 'system'
        ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : theme
      document.documentElement.dataset.theme = resolved
      if (onChange) onChange(theme)
      else setMode(resolved)
    }

    const options: Array<{ value: Theme; icon: 'sun' | 'moon' | 'monitor'; label: string }> = [
      { value: 'light', icon: 'sun', label: 'Light' },
      { value: 'dark', icon: 'moon', label: 'Dark' },
      { value: 'system', icon: 'monitor', label: 'System' },
    ]

    return (
      <div ref={ref} className={cn('layout-theme-switcher', className)} data-theme-switcher {...props}>
        {options.map((opt) => (
          <button
            key={opt.value}
            className={cn('layout-icon-button', current === opt.value && 'is-active')}
            onClick={() => apply(opt.value)}
            aria-label={opt.label}
            title={opt.label}
          >
            <Icon name={opt.icon} className="h-4 w-4" />
          </button>
        ))}
      </div>
    )
  }
)
ThemeSwitcher.displayName = 'ThemeSwitcher'
