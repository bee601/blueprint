import { cn } from '@utils/cn';
import { Check, Minus } from 'lucide-react';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

export interface CheckboxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    checked?: boolean;
    indeterminate?: boolean;
    onCheckedChange?: (next: boolean) => void;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
    { className, checked, indeterminate, onCheckedChange, onClick, ...rest },
    ref,
) {
    return (
        <button
            ref={ref}
            role="checkbox"
            aria-checked={indeterminate ? 'mixed' : !!checked}
            onClick={(e) => {
                onCheckedChange?.(!(checked ?? false));
                onClick?.(e);
            }}
            className={cn(
                'flex h-4 w-4 flex-none items-center justify-center rounded border border-border bg-background/40 transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                checked && 'border-primary bg-primary text-primary-foreground',
                indeterminate && 'border-primary bg-primary text-primary-foreground',
                className,
            )}
            {...rest}
        >
            {indeterminate ? <Minus className="h-3 w-3" /> : checked ? <Check className="h-3 w-3" /> : null}
        </button>
    );
});
