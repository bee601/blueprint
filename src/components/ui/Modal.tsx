import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react';
import { cn } from '@utils/cn';

export interface ModalProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    hideClose?: boolean;
    title?: string;
    description?: string;
}

export const Modal = ({ children, size = 'md', hideClose, title, description, ...props }: ModalProps) => {
    return (
        <DialogPrimitive.Root {...props}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <DialogPrimitive.Content
                    className={cn(
                        'fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-border bg-card shadow-pop rounded-2xl',
                        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                        size === 'sm' && 'max-w-sm',
                        size === 'md' && 'max-w-md',
                        size === 'lg' && 'max-w-2xl',
                        size === 'xl' && 'max-w-4xl',
                        size === 'full' && 'max-w-[95vw] h-[90vh]',
                    )}
                >
                    {(title || description) && (
                        <div className="border-b border-border p-4">
                            {title && <DialogPrimitive.Title className="text-base font-semibold">{title}</DialogPrimitive.Title>}
                            {description && <DialogPrimitive.Description className="mt-1 text-xs text-muted-foreground">{description}</DialogPrimitive.Description>}
                        </div>
                    )}
                    {children}
                    {!hideClose && (
                        <DialogPrimitive.Close className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </DialogPrimitive.Close>
                    )}
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
};

export const ModalBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function ModalBody(
    { className, ...rest },
    ref,
) {
    return <div ref={ref} className={cn('p-4', className)} {...rest} />;
});

export const ModalFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function ModalFooter(
    { className, ...rest },
    ref,
) {
    return (
        <div
            ref={ref}
            className={cn('flex flex-col-reverse items-stretch justify-end gap-2 border-t border-border p-3 sm:flex-row sm:items-center', className)}
            {...rest}
        />
    );
});

export type ModalElement = ElementRef<typeof DialogPrimitive.Content>;
