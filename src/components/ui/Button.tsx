import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@utils/cn';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary:
                    'bg-primary text-primary-foreground shadow-glow-sm hover:bg-primary/90 hover:shadow-glow active:scale-[0.98] active:shadow-glow-sm',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border',
                outline:
                    'border border-border bg-transparent text-foreground hover:bg-secondary/50 hover:border-primary/40',
                ghost:
                    'bg-transparent text-foreground hover:bg-secondary/60',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-glow-sm',
                link: 'text-primary underline-offset-4 hover:underline',
                glass:
                    'glass text-foreground hover:bg-background/80',
            },
            size: {
                xs: 'h-7 px-2.5 text-xs rounded-md',
                sm: 'h-8 px-3 text-sm rounded-md',
                md: 'h-10 px-4 text-sm',
                lg: 'h-11 px-6 text-base rounded-xl',
                xl: 'h-12 px-8 text-base rounded-xl',
                icon: 'h-9 w-9',
                'icon-sm': 'h-7 w-7',
                'icon-lg': 'h-11 w-11',
            },
            block: {
                true: 'w-full',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    },
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {
        className,
        variant,
        size,
        block,
        asChild,
        loading,
        leftIcon,
        rightIcon,
        children,
        disabled,
        type = 'button',
        ...rest
    },
    ref,
) {
    const Comp = asChild ? Slot : 'button';
    return (
        <Comp
            ref={ref}
            type={asChild ? undefined : type}
            className={cn(buttonVariants({ variant, size, block }), loading && 'cursor-wait', className)}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? <Spinner /> : leftIcon}
            {children}
            {rightIcon}
        </Comp>
    );
});

export { buttonVariants };

function Spinner() {
    return (
        <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden
        >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
}
