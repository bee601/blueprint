import { cn } from '@utils/cn';
import type { HTMLAttributes } from 'react';

export function PageContainer({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8', className)} {...rest} />;
}

export function PageHeader({
    title,
    description,
    actions,
    breadcrumb,
    className,
}: {
    title: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
    breadcrumb?: React.ReactNode;
    className?: string;
}) {
    return (
        <header className={cn('space-y-3', className)}>
            {breadcrumb && <div className="text-xs text-muted-foreground">{breadcrumb}</div>}
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{title}</h1>
                    {description && <p className="max-w-2xl text-sm text-muted-foreground text-pretty">{description}</p>}
                </div>
                {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
            </div>
        </header>
    );
}

export function PageSection({ title, description, actions, children, className }: { title?: React.ReactNode; description?: React.ReactNode; actions?: React.ReactNode; children: React.ReactNode; className?: string }) {
    return (
        <section className={cn('space-y-4', className)}>
            {(title || description || actions) && (
                <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                    <div>
                        {title && <h2 className="text-lg font-semibold tracking-tight">{title}</h2>}
                        {description && <p className="text-sm text-muted-foreground">{description}</p>}
                    </div>
                    {actions && <div className="flex items-center gap-2">{actions}</div>}
                </div>
            )}
            {children}
        </section>
    );
}
