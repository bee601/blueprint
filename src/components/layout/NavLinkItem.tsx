import { cn } from '@utils/cn';
import { NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

export interface NavItem {
    to: string;
    label: string;
    icon: LucideIcon | ReactNode;
    badge?: ReactNode;
    exact?: boolean;
    children?: NavItem[];
    permission?: string;
    hidden?: boolean;
}

export interface NavGroup {
    label: string;
    items: NavItem[];
    collapsible?: boolean;
    defaultOpen?: boolean;
    badge?: ReactNode;
}

export function NavLinkItem({ item, collapsed }: { item: NavItem; collapsed?: boolean }) {
    const iconNode =
        typeof item.icon === 'function' ? (() => {
            const Icon = item.icon as LucideIcon;
            return <Icon className="h-4 w-4 flex-none" />;
        })() : (
            <span className="flex h-4 w-4 flex-none items-center justify-center text-base">{item.icon}</span>
        );
    return (
        <NavLink
            to={item.to}
            end={item.exact}
            className={({ isActive }) =>
                cn(
                    'group relative flex items-center gap-3 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all duration-200',
                    isActive
                        ? 'bg-primary/10 text-foreground'
                        : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
                    collapsed && 'justify-center px-0',
                )
            }
        >
            {({ isActive }) => (
                <>
                    {isActive && (
                        <span
                            className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary"
                            aria-hidden
                        />
                    )}
                    {iconNode}
                    {!collapsed && (
                        <>
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.badge && <span className="text-xs text-muted-foreground">{item.badge}</span>}
                            {item.children && item.children.length > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground/50" />}
                        </>
                    )}
                </>
            )}
        </NavLink>
    );
}

export function NavGroupSection({ group, collapsed }: { group: NavGroup; collapsed?: boolean }) {
    if (group.items.every((i) => i.hidden)) return null;
    return (
        <div className="space-y-1">
            {!collapsed && group.label && (
                <div className="px-2.5 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {group.label}
                </div>
            )}
            {group.items.map((item) => (
                <NavLinkItem key={item.to} item={item} collapsed={collapsed} />
            ))}
        </div>
    );
}
