import { cn } from '@utils/cn';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

export const Switch = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { checked?: boolean; onCheckedChange?: (next: boolean) => void }>(
    function Switch({ className, checked, onCheckedChange, onClick, ...rest }, ref) {
        return (
            <button
                ref={ref}
                role="switch"
                aria-checked={checked ?? false}
                onClick={(event) => {
                    onCheckedChange?.(!(checked ?? false));
                    onClick?.(event);
                }}
                className={cn(
                    'peer inline-flex h-5 w-9 flex-none cursor-pointer items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    checked ? 'bg-primary' : 'bg-input',
                    className,
                )}
                {...rest}
            >
                <span
                    className={cn(
                        'pointer-events-none block h-4 w-4 rounded-full bg-foreground shadow-sm transition-transform duration-200 ease-out-expo',
                        checked ? 'translate-x-4' : 'translate-x-0.5',
                    )}
                />
            </button>
        );
    },
);
