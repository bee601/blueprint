import { cn } from '@utils/cn';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

export interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    pressed?: boolean;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
    { className, pressed, ...rest },
    ref,
) {
    return (
        <button
            ref={ref}
            aria-pressed={pressed ?? false}
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors',
                'hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                pressed ? 'bg-secondary text-foreground' : 'text-muted-foreground',
                className,
            )}
            {...rest}
        />
    );
});

export interface ToggleGroupProps<T extends string> {
    value: T;
    onValueChange: (next: T) => void;
    options: Array<{ value: T; label: React.ReactNode; icon?: React.ReactNode }>;
    className?: string;
    size?: 'sm' | 'md';
}

export function ToggleGroup<T extends string>({ value, onValueChange, options, className, size = 'md' }: ToggleGroupProps<T>) {
    return (
        <div
            className={cn(
                'inline-flex items-center gap-1 rounded-lg border border-border bg-card p-1',
                size === 'sm' ? 'h-8' : 'h-10',
                className,
            )}
            role="radiogroup"
        >
            {options.map((opt) => {
                const selected = opt.value === value;
                return (
                    <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => onValueChange(opt.value)}
                        className={cn(
                            'inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-all duration-200 ease-out-expo',
                            size === 'sm' ? 'h-6 text-xs' : 'h-8',
                            selected
                                ? 'bg-secondary text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground',
                        )}
                    >
                        {opt.icon}
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}
