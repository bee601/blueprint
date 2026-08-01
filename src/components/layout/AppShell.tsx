import { cn } from '@utils/cn';
import type { HTMLAttributes } from 'react';

export function AppShell({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('relative flex min-h-screen bg-background text-foreground', className)} {...rest} />;
}

export function AppMain({ className, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <main className={cn('flex min-h-screen flex-1 flex-col overflow-x-hidden', className)} {...rest} />
    );
}
