import { useState, useEffect } from 'react';
import { cn } from '@utils/cn';

export interface Toast {
    id: string;
    title: string;
    description?: string;
    variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    action?: { label: string; onClick: () => void };
}

const VARIANT_STYLES: Record<NonNullable<Toast['variant']>, string> = {
    default: 'border-border bg-card text-foreground',
    success: 'border-success/30 bg-card text-foreground',
    error: 'border-destructive/30 bg-card text-foreground',
    warning: 'border-warning/30 bg-card text-foreground',
    info: 'border-info/30 bg-card text-foreground',
};

const VARIENT_DOT: Record<NonNullable<Toast['variant']>, string> = {
    default: 'bg-foreground',
    success: 'bg-success',
    error: 'bg-destructive',
    warning: 'bg-warning',
    info: 'bg-info',
};

export interface ToasterProps {
    toasts: Toast[];
    onDismiss: (id: string) => void;
}

export function Toaster({ toasts, onDismiss }: ToasterProps) {
    return (
        <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-2">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
            ))}
        </div>
    );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const t = window.setTimeout(() => setOpen(true), 10);
        return () => window.clearTimeout(t);
    }, []);
    useEffect(() => {
        if (!toast.duration) return;
        const t = window.setTimeout(() => onDismiss(toast.id), toast.duration);
        return () => window.clearTimeout(t);
    }, [toast.id, toast.duration, onDismiss]);

    return (
        <div
            className={cn(
                'pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-xl border p-4 shadow-pop backdrop-blur',
                'transition-all duration-300 ease-out-expo',
                VARIANT_STYLES[toast.variant ?? 'default'],
                open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0',
            )}
            role="status"
        >
            <span className={cn('mt-1 h-2 w-2 flex-none rounded-full shadow-[0_0_8px_currentColor]', VARIANT_DOT[toast.variant ?? 'default'])} />
            <div className="flex-1 space-y-0.5">
                <p className="text-sm font-medium">{toast.title}</p>
                {toast.description && <p className="text-xs text-muted-foreground">{toast.description}</p>}
                {toast.action && (
                    <button
                        onClick={toast.action.onClick}
                        className="mt-1 text-xs font-semibold text-primary hover:underline"
                    >
                        {toast.action.label}
                    </button>
                )}
            </div>
            <button
                onClick={() => onDismiss(toast.id)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Dismiss"
            >
                <span className="text-lg leading-none">×</span>
            </button>
        </div>
    );
}
