import { cn } from '@utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';

export const Avatar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Avatar(
    { className, ...rest },
    ref,
) {
    return <div ref={ref} className={cn('relative flex h-10 w-10 flex-none overflow-hidden rounded-full', className)} {...rest} />;
});

export const AvatarImage = forwardRef<HTMLImageElement, HTMLAttributes<HTMLImageElement>>(function AvatarImage(
    { className, ...rest },
    ref,
) {
    return <img ref={ref} className={cn('aspect-square h-full w-full object-cover', className)} {...rest} />;
});

export const AvatarFallback = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function AvatarFallback(
    { className, children, ...rest },
    ref,
) {
    return (
        <div
            ref={ref}
            className={cn('flex h-full w-full items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground', className)}
            {...rest}
        >
            {children}
        </div>
    );
});
