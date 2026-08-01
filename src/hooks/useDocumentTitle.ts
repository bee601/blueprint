import { useEffect, useState } from 'react';

export function useDocumentTitle(title: string, options?: { suffix?: string; restoreOnUnmount?: boolean }) {
    const suffix = options?.suffix;
    const [previous] = useState(() => (typeof document !== 'undefined' ? document.title : ''));
    useEffect(() => {
        if (typeof document === 'undefined') return;
        const value = suffix ? `${title} · ${suffix}` : title;
        document.title = value;
    }, [title, suffix]);
    useEffect(() => {
        if (!options?.restoreOnUnmount) return;
        return () => {
            if (typeof document !== 'undefined') document.title = previous;
        };
    }, [options?.restoreOnUnmount, previous]);
}
