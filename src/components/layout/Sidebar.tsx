import { cn } from '@utils/cn';
import type { HTMLAttributes } from 'react';
import { useState } from 'react';
import { NavGroupSection, type NavGroup } from './NavLinkItem';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@components/ui/Tooltip';
import { ChevronsLeft, ChevronsRight, X } from 'lucide-react';
import { Button } from '@components/ui/Button';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
    groups: NavGroup[];
    collapsed: boolean;
    onToggle: () => void;
    mobileOpen?: boolean;
    onMobileClose?: () => void;
    footer?: React.ReactNode;
    header?: React.ReactNode;
}

export function Sidebar({ groups, collapsed, onToggle, mobileOpen, onMobileClose, footer, header, className, ...rest }: SidebarProps) {
    return (
        <TooltipProvider delayDuration={120}>
            <aside
                className={cn(
                    'sticky top-0 z-40 hidden h-screen flex-none border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex',
                    collapsed ? 'w-[72px]' : 'w-64',
                    'transition-[width] duration-300 ease-out-expo',
                    className,
                )}
                {...rest}
            >
                <div className="flex h-full w-full flex-col">
                    <SidebarHeader collapsed={collapsed} onToggle={onToggle} header={header} />
                    <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
                        <div className="space-y-6">
                            {groups.map((group) => (
                                <NavGroupSection key={group.label} group={group} collapsed={collapsed} />
                            ))}
                        </div>
                    </nav>
                    {footer && (
                        <div className={cn('border-t border-sidebar-border p-3', collapsed && 'flex justify-center')}>{footer}</div>
                    )}
                </div>
            </aside>

            {/* Mobile drawer */}
            <div
                className={cn(
                    'fixed inset-0 z-50 lg:hidden',
                    mobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
                )}
            >
                <div
                    className={cn(
                        'absolute inset-0 bg-background/70 backdrop-blur transition-opacity duration-300',
                        mobileOpen ? 'opacity-100' : 'opacity-0',
                    )}
                    onClick={onMobileClose}
                />
                <aside
                    className={cn(
                        'absolute left-0 top-0 h-full w-72 max-w-[85vw] border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-pop transition-transform duration-300 ease-out-expo',
                        mobileOpen ? 'translate-x-0' : '-translate-x-full',
                    )}
                >
                    <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-3">
                        <SidebarBrand collapsed={false} onToggle={onMobileClose} />
                    </div>
                    <nav className="flex-1 overflow-y-auto px-3 py-4">
                        <div className="space-y-6">
                            {groups.map((group) => (
                                <NavGroupSection key={group.label} group={group} />
                            ))}
                        </div>
                    </nav>
                    {footer && <div className="border-t border-sidebar-border p-3">{footer}</div>}
                </aside>
            </div>
        </TooltipProvider>
    );
}

function SidebarHeader({ collapsed, onToggle, header }: { collapsed: boolean; onToggle: () => void; header?: React.ReactNode }) {
    return (
        <div className={cn('flex h-14 items-center justify-between border-b border-sidebar-border px-3')}>
            {header ?? <SidebarBrand collapsed={collapsed} />}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon-sm" onClick={onToggle} className="text-muted-foreground">
                        {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{collapsed ? 'Expand sidebar' : 'Collapse sidebar'}</TooltipContent>
            </Tooltip>
        </div>
    );
}

function SidebarBrand({ collapsed, onToggle }: { collapsed: boolean; onToggle?: () => void }) {
    return (
        <a href="/" className="flex items-center gap-2 text-sm font-semibold">
            <img src="/images/logo.svg" alt="Logo" className="h-7 w-7" />
            {!collapsed && <span className="bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">Blueprint</span>}
            {onToggle && (
                <Button variant="ghost" size="icon-sm" onClick={onToggle} className="ml-auto text-muted-foreground">
                    <X className="h-4 w-4" />
                </Button>
            )}
        </a>
    );
}

export function useMobileSidebar(defaultOpen = false) {
    const [open, setOpen] = useState(defaultOpen);
    return { open, setOpen, toggle: () => setOpen((o) => !o) };
}
