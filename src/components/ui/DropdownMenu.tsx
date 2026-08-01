import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight } from 'lucide-react';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cn } from '@utils/cn';

export const DropdownMenu = DropdownPrimitive.Root;
export const DropdownMenuTrigger = DropdownPrimitive.Trigger;
export const DropdownMenuGroup = DropdownPrimitive.Group;
export const DropdownMenuPortal = DropdownPrimitive.Portal;
export const DropdownMenuSub = DropdownPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownPrimitive.RadioGroup;

export const DropdownMenuSubTrigger = forwardRef<
    ElementRef<typeof DropdownPrimitive.SubTrigger>,
    ComponentPropsWithoutRef<typeof DropdownPrimitive.SubTrigger> & { inset?: boolean }
>(function DropdownMenuSubTrigger({ className, inset, children, ...rest }, ref) {
    return (
        <DropdownPrimitive.SubTrigger
            ref={ref}
            className={cn(
                'flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none focus:bg-secondary data-[state=open]:bg-secondary',
                inset && 'pl-8',
                className,
            )}
            {...rest}
        >
            {children}
            <ChevronRight className="ml-auto h-4 w-4" />
        </DropdownPrimitive.SubTrigger>
    );
});

export const DropdownMenuSubContent = forwardRef<
    ElementRef<typeof DropdownPrimitive.SubContent>,
    ComponentPropsWithoutRef<typeof DropdownPrimitive.SubContent>
>(function DropdownMenuSubContent({ className, ...rest }, ref) {
    return (
        <DropdownPrimitive.SubContent
            ref={ref}
            className={cn(
                'z-50 min-w-[8rem] overflow-hidden rounded-xl border border-border bg-card p-1 text-popover-foreground shadow-pop',
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                className,
            )}
            {...rest}
        />
    );
});

export const DropdownMenuContent = forwardRef<
    ElementRef<typeof DropdownPrimitive.Content>,
    ComponentPropsWithoutRef<typeof DropdownPrimitive.Content>
>(function DropdownMenuContent({ className, sideOffset = 6, ...rest }, ref) {
    return (
        <DropdownPrimitive.Portal>
            <DropdownPrimitive.Content
                ref={ref}
                sideOffset={sideOffset}
                className={cn(
                    'z-50 min-w-[10rem] overflow-hidden rounded-xl border border-border bg-card p-1 text-popover-foreground shadow-pop',
                    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                    className,
                )}
                {...rest}
            />
        </DropdownPrimitive.Portal>
    );
});

export const DropdownMenuItem = forwardRef<
    ElementRef<typeof DropdownPrimitive.Item>,
    ComponentPropsWithoutRef<typeof DropdownPrimitive.Item> & { inset?: boolean; destructive?: boolean }
>(function DropdownMenuItem({ className, inset, destructive, ...rest }, ref) {
    return (
        <DropdownPrimitive.Item
            ref={ref}
            className={cn(
                'relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors',
                'focus:bg-secondary focus:text-foreground',
                'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                destructive && 'text-destructive focus:bg-destructive/10 focus:text-destructive',
                inset && 'pl-8',
                className,
            )}
            {...rest}
        />
    );
});

export const DropdownMenuCheckboxItem = forwardRef<
    ElementRef<typeof DropdownPrimitive.CheckboxItem>,
    ComponentPropsWithoutRef<typeof DropdownPrimitive.CheckboxItem>
>(function DropdownMenuCheckboxItem({ className, children, checked, ...rest }, ref) {
    return (
        <DropdownPrimitive.CheckboxItem
            ref={ref}
            className={cn(
                'relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-secondary',
                className,
            )}
            checked={checked}
            {...rest}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <DropdownPrimitive.ItemIndicator>
                    <Check className="h-4 w-4" />
                </DropdownPrimitive.ItemIndicator>
            </span>
            {children}
        </DropdownPrimitive.CheckboxItem>
    );
});

export const DropdownMenuLabel = forwardRef<
    ElementRef<typeof DropdownPrimitive.Label>,
    ComponentPropsWithoutRef<typeof DropdownPrimitive.Label> & { inset?: boolean }
>(function DropdownMenuLabel({ className, inset, ...rest }, ref) {
    return (
        <DropdownPrimitive.Label
            ref={ref}
            className={cn('px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground', inset && 'pl-8', className)}
            {...rest}
        />
    );
});

export const DropdownMenuSeparator = forwardRef<
    ElementRef<typeof DropdownPrimitive.Separator>,
    ComponentPropsWithoutRef<typeof DropdownPrimitive.Separator>
>(function DropdownMenuSeparator({ className, ...rest }, ref) {
    return <DropdownPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-border', className)} {...rest} />;
});
