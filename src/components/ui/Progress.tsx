import * as ProgressPrimitive from '@radix-ui/react-progress';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@utils/cn';

export const Progress = forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { indicatorClassName?: string; value?: number }
>(function Progress({ className, value, indicatorClassName, ...props }, ref) {
    return (
        <ProgressPrimitive.Root
            ref={ref}
            className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
            {...props}
        >
            <ProgressPrimitive.Indicator
                className={cn(
                    'h-full w-full flex-1 bg-primary transition-transform duration-500 ease-out-expo',
                    indicatorClassName,
                )}
                style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
            />
        </ProgressPrimitive.Root>
    );
});

export interface ProgressBarProps {
    value: number;
    max?: number;
    className?: string;
    indicatorClassName?: string;
    showLabel?: boolean;
    variant?: 'primary' | 'success' | 'warning' | 'danger';
}

export function ProgressBar({
    value,
    max = 100,
    className,
    indicatorClassName,
    showLabel = false,
    variant = 'primary',
}: ProgressBarProps) {
    const pct = Math.max(0, Math.min(100, (value / max) * 100));
    return (
        <div className="space-y-1">
            <div className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}>
                <div
                    className={cn(
                        'h-full transition-all duration-500 ease-out-expo',
                        variant === 'primary' && 'bg-primary',
                        variant === 'success' && 'bg-success',
                        variant === 'warning' && 'bg-warning',
                        variant === 'danger' && 'bg-destructive',
                        indicatorClassName,
                    )}
                    style={{ width: `${pct}%` }}
                />
            </div>
            {showLabel && (
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{Math.round(pct)}%</span>
                </div>
            )}
        </div>
    );
}
