import { useEffect, useRef, useState } from 'react';

export function useDebouncedValue<T>(value: T, delay = 200): T {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const id = window.setTimeout(() => setDebounced(value), delay);
        return () => window.clearTimeout(id);
    }, [value, delay]);
    return debounced;
}

export function useDebouncedCallback<T extends (...args: any[]) => unknown>(fn: T, delay = 200): T {
    const ref = useRef<number | null>(null);
    const callback = useRef(fn);
    callback.current = fn;
    useEffect(() => () => {
        if (ref.current) window.clearTimeout(ref.current);
    }, []);
    return ((...args: Parameters<T>) => {
        if (ref.current) window.clearTimeout(ref.current);
        ref.current = window.setTimeout(() => callback.current(...args), delay);
    }) as T;
}
