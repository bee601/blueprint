import { cn } from '@utils/cn';
import type { HTMLAttributes } from 'react';
import { ArrowRight, type LucideIcon } from 'lucide-react';

export interface ActionCardProps extends HTMLAttributes<HTMLButtonElement> {
    title: string;
    description?: string;
    icon: LucideIcon;
    href?: string;
    intent?: 'primary' | 'success' | 'warning' | 'danger' | 'default';
}

const INTENT: Record<NonNullable<ActionCardProps['intent']>, string> = {
    default: 'bg-secondary/40 text-muted-foreground group-hover:text-foreground',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-destructive/10 text-destructive',
};

export function ActionCard({ title, description, icon: Icon, href, intent = 'default', className, ...rest }: ActionCardProps) {
    const Comp: any = href ? 'a' : 'button';
    return (
        <Comp
            href={href}
            className={cn(
                'group flex w-full items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-card transition-all duration-200 ease-out-expo',
                'hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card-hover',
                className,
            )}
            {...rest}
        >
            <div className={cn('flex h-10 w-10 flex-none items-center justify-center rounded-xl', INTENT[intent])}>
                <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-0.5">
                <h4 className="text-sm font-semibold">{title}</h4>
                {description && <p className="text-xs text-muted-foreground">{description}</p>}
            </div>
            <ArrowRight className="h-4 w-4 flex-none text-muted-foreground transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 group-hover:text-foreground" />
        </Comp>
    );
}
