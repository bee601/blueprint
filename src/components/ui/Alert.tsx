import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

const alertVariants = cva(
    'relative w-full rounded-xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
    {
        variants: {
            variant: {
                default: 'bg-card text-card-foreground border-border',
                primary: 'border-primary/30 bg-primary/5 text-foreground [&>svg]:text-primary',
                destructive: 'border-destructive/30 bg-destructive/5 text-foreground [&>svg]:text-destructive',
                success: 'border-success/30 bg-success/5 text-foreground [&>svg]:text-success',
                warning: 'border-warning/30 bg-warning/5 text-foreground [&>svg]:text-warning',
                info: 'border-info/30 bg-info/5 text-foreground [&>svg]:text-info',
            },
        },
        defaultVariants: { variant: 'default' },
    },
);

export interface AlertProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert({ className, variant, ...rest }, ref) {
    return <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...rest} />;
});

export const AlertTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(function AlertTitle(
    { className, ...rest },
    ref,
) {
    return <h5 ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...rest} />;
});

export const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    function AlertDescription({ className, ...rest }, ref) {
        return <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed text-muted-foreground', className)} {...rest} />;
    },
);
