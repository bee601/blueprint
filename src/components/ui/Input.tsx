import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    invalid?: boolean;
    wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { className, leftIcon, rightIcon, invalid, wrapperClassName, type = 'text', ...rest },
    ref,
) {
    if (!leftIcon && !rightIcon) {
        return (
            <input
                ref={ref}
                type={type}
                className={cn(
                    'flex h-10 w-full rounded-lg border border-input bg-background/40 px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
                    invalid && 'border-destructive focus-visible:ring-destructive',
                    className,
                )}
                {...rest}
            />
        );
    }
    return (
        <div className={cn('relative flex items-center', wrapperClassName)}>
            {leftIcon && (
                <span className="pointer-events-none absolute left-3 text-muted-foreground">
                    {leftIcon}
                </span>
            )}
            <input
                ref={ref}
                type={type}
                className={cn(
                    'flex h-10 w-full rounded-lg border border-input bg-background/40 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
                    leftIcon ? 'pl-10' : 'pl-3',
                    rightIcon ? 'pr-10' : 'pr-3',
                    invalid && 'border-destructive focus-visible:ring-destructive',
                    className,
                )}
                {...rest}
            />
            {rightIcon && (
                <span className="pointer-events-none absolute right-3 text-muted-foreground">
                    {rightIcon}
                </span>
            )}
        </div>
    );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
    { className, invalid, ...rest },
    ref,
) {
    return (
        <textarea
            ref={ref}
            className={cn(
                'flex min-h-[80px] w-full rounded-lg border border-input bg-background/40 px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
                invalid && 'border-destructive focus-visible:ring-destructive',
                className,
            )}
            {...rest}
        />
    );
});

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
    { className, required, children, ...rest },
    ref,
) {
    return (
        <label
            ref={ref}
            className={cn('text-sm font-medium leading-none text-foreground/90', className)}
            {...rest}
        >
            {children}
            {required && <span className="ml-0.5 text-destructive">*</span>}
        </label>
    );
});

export interface FieldProps {
    label?: string;
    description?: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
    htmlFor?: string;
}

export function Field({ label, description, error, required, children, className, htmlFor }: FieldProps) {
    return (
        <div className={cn('space-y-2', className)}>
            {label && (
                <Label htmlFor={htmlFor} required={required}>
                    {label}
                </Label>
            )}
            {children}
            {description && !error && <p className="text-xs text-muted-foreground">{description}</p>}
            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}
