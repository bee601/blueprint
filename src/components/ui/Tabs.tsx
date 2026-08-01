import * as TabsPrimitive from '@radix-ui/react-tabs';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cn } from '@utils/cn';

export const Tabs = TabsPrimitive.Root;

export const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>, ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
    function TabsList({ className, ...rest }, ref) {
        return (
            <TabsPrimitive.List
                ref={ref}
                className={cn(
                    'inline-flex h-10 items-center justify-center gap-1 rounded-lg border border-border bg-card p-1 text-muted-foreground',
                    className,
                )}
                {...rest}
            />
        );
    },
);

export const TabsTrigger = forwardRef<ElementRef<typeof TabsPrimitive.Trigger>, ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(
    function TabsTrigger({ className, ...rest }, ref) {
        return (
            <TabsPrimitive.Trigger
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    'disabled:pointer-events-none disabled:opacity-50',
                    'data-[state=active]:bg-secondary data-[state=active]:text-foreground data-[state=active]:shadow-sm',
                    className,
                )}
                {...rest}
            />
        );
    },
);

export const TabsContent = forwardRef<ElementRef<typeof TabsPrimitive.Content>, ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(
    function TabsContent({ className, ...rest }, ref) {
        return (
            <TabsPrimitive.Content
                ref={ref}
                className={cn(
                    'mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    className,
                )}
                {...rest}
            />
        );
    },
);
