import { cn } from '@utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
    { className, icon, title, description, action, children, ...rest },
    ref,
) {
    return (
        <div
            ref={ref}
            className={cn(
                'flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center',
                className,
            )}
            {...rest}
        >
            {icon && <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/50 text-muted-foreground">{icon}</div>}
            <div className="space-y-1">
                <h3 className="text-base font-semibold tracking-tight">{title}</h3>
                {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
            </div>
            {action}
            {children}
        </div>
    );
});
