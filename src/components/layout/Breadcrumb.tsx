import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@utils/cn';

export interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: ReactNode;
}

export function Breadcrumb({ items, separator, className }: { items: BreadcrumbItem[]; separator?: ReactNode; className?: string }) {
    if (items.length === 0) return null;
    return (
        <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1 text-xs text-muted-foreground', className)}>
            {items.map((item, idx) => {
                const last = idx === items.length - 1;
                return (
                    <span key={`${item.label}-${idx}`} className="flex items-center gap-1">
                        {item.href && !last ? (
                            <NavLink to={item.href} className="hover:text-foreground">
                                {item.label}
                            </NavLink>
                        ) : (
                            <span className={cn(last ? 'text-foreground' : '')}>{item.label}</span>
                        )}
                        {!last && <span className="text-muted-foreground/50">{separator ?? <ChevronRight className="h-3 w-3" />}</span>}
                    </span>
                );
            })}
        </nav>
    );
}
