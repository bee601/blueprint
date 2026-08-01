import { cn } from '@utils/cn';
import { forwardRef, type HTMLAttributes } from 'react';

export const Separator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { orientation?: 'horizontal' | 'vertical' }>(function Separator(
    { className, orientation = 'horizontal', ...rest },
    ref,
) {
    return (
        <div
            ref={ref}
            role="separator"
            aria-orientation={orientation}
            className={cn(
                'shrink-0 bg-border',
                orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
                className,
            )}
            {...rest}
        />
    );
});
