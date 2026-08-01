import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cn } from '@utils/cn';

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = forwardRef<ElementRef<typeof TooltipPrimitive.Content>, ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>>(
    function TooltipContent({ className, sideOffset = 6, ...rest }, ref) {
        return (
            <TooltipPrimitive.Content
                ref={ref}
                sideOffset={sideOffset}
                className={cn(
                    'z-50 overflow-hidden rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-foreground shadow-pop',
                    'data-[state=delayed-open]:data-[side=top]:animate-slide-in-from-bottom data-[state=delayed-open]:data-[side=bottom]:animate-slide-in-from-top',
                    className,
                )}
                {...rest}
            />
        );
    },
);
