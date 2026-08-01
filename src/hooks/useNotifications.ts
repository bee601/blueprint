import { useCallback, useEffect, useState } from 'react';
import { uid } from '@utils/uid';
import type { Notification, ToastVariant } from '@/types';

export interface UseNotifications {
    items: Notification[];
    push: (n: Partial<Notification> & { title: string; variant?: ToastVariant }) => string;
    dismiss: (id: string) => void;
    clear: () => void;
}

const DEFAULT_DURATION = 4500;

export function useNotifications(): UseNotifications {
    const [items, setItems] = useState<Notification[]>([]);

    const dismiss = useCallback((id: string) => {
        setItems((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const push = useCallback(
        (n: Partial<Notification> & { title: string; variant?: ToastVariant }): string => {
            const id = n.id ?? uid('ntf');
            const variant: ToastVariant = n.variant ?? 'default';
            const item: Notification = {
                id,
                title: n.title,
                description: n.description,
                variant,
                createdAt: Date.now(),
                duration: n.duration ?? DEFAULT_DURATION,
                action: n.action,
                dismissible: n.dismissible ?? true,
            };
            setItems((prev) => [item, ...prev].slice(0, 20));
            if (item.duration && item.duration > 0) {
                window.setTimeout(() => dismiss(id), item.duration);
            }
            return id;
        },
        [dismiss],
    );

    const clear = useCallback(() => setItems([]), []);

    useEffect(() => () => setItems([]), []);

    return { items, push, dismiss, clear };
}
