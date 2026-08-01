import { useEffect, useRef, useState } from 'react';

export function useClickOutside<T extends HTMLElement>(handler: () => void, enabled = true) {
    const ref = useRef<T | null>(null);
    useEffect(() => {
        if (!enabled) return;
        const onClick = (event: MouseEvent) => {
            const el = ref.current;
            if (!el) return;
            const target = event.target as Node;
            if (el.contains(target)) return;
            handler();
        };
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') handler();
        };
        document.addEventListener('mousedown', onClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [handler, enabled]);
    return ref;
}
