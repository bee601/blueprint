import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@utils/cn';

const badgeVariants = cva(
    'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-primary/15 text-primary',
                secondary: 'border-transparent bg-secondary text-secondary-foreground',
                outline: 'border-border text-foreground/80',
                success: 'border-transparent bg-success/15 text-success',
                warning: 'border-transparent bg-warning/15 text-warning',
                destructive: 'border-transparent bg-destructive/15 text-destructive',
                info: 'border-transparent bg-info/15 text-info',
                glass: 'glass text-foreground',
            },
        },
        defaultVariants: { variant: 'default' },
    },
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge({ className, variant, ...rest }, ref) {
    return <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...rest} />;
});

export { badgeVariants };
