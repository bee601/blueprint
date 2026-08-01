import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@utils/cn';
import type { HTMLAttributes } from 'react';

const statusVariants = cva(
    'inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium',
    {
        variants: {
            status: {
                online: 'bg-success/10 text-success ring-1 ring-success/30',
                running: 'bg-success/10 text-success ring-1 ring-success/30',
                starting: 'bg-info/10 text-info ring-1 ring-info/30',
                stopping: 'bg-warning/10 text-warning ring-1 ring-warning/30',
                stopped: 'bg-muted text-muted-foreground ring-1 ring-border',
                offline: 'bg-muted text-muted-foreground ring-1 ring-border',
                crashed: 'bg-destructive/10 text-destructive ring-1 ring-destructive/30',
                error: 'bg-destructive/10 text-destructive ring-1 ring-destructive/30',
                installing: 'bg-accent/10 text-accent ring-1 ring-accent/30',
                warning: 'bg-warning/10 text-warning ring-1 ring-warning/30',
                unknown: 'bg-muted text-muted-foreground ring-1 ring-border',
            },
        },
    },
);

export interface StatusIndicatorProps
    extends HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof statusVariants> {
    pulse?: boolean;
    label?: string;
}

export function StatusIndicator({ status, pulse = true, label, className, children, ...rest }: StatusIndicatorProps) {
    return (
        <span className={cn(statusVariants({ status }), className)} {...rest}>
            <span className="relative flex h-2 w-2">
                {pulse && <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-current opacity-50" />}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
            </span>
            {label ?? children ?? status}
        </span>
    );
}
