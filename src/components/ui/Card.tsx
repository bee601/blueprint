import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outline' | 'glass' | 'gradient' | 'flat';
    hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
    { className, variant = 'default', hoverable, children, ...rest },
    ref,
) {
    return (
        <div
            ref={ref}
            className={cn(
                'rounded-2xl border text-card-foreground transition-all duration-300 ease-out-expo',
                variant === 'default' && 'border-border bg-card shadow-card',
                variant === 'outline' && 'border-border bg-transparent',
                variant === 'glass' && 'glass shadow-card',
                variant === 'gradient' && 'gradient-border bg-card shadow-card',
                variant === 'flat' && 'border-transparent bg-secondary/40',
                hoverable && 'hover:-translate-y-0.5 hover:shadow-card-hover hover:border-primary/30',
                className,
            )}
            {...rest}
        >
            {children}
        </div>
    );
});

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardHeader(
    { className, ...rest },
    ref,
) {
    return <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...rest} />;
});

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(function CardTitle(
    { className, ...rest },
    ref,
) {
    return <h3 ref={ref} className={cn('text-base font-semibold leading-none tracking-tight', className)} {...rest} />;
});

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    function CardDescription({ className, ...rest }, ref) {
        return <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...rest} />;
    },
);

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardContent(
    { className, ...rest },
    ref,
) {
    return <div ref={ref} className={cn('p-6 pt-0', className)} {...rest} />;
});

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardFooter(
    { className, ...rest },
    ref,
) {
    return <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...rest} />;
});
