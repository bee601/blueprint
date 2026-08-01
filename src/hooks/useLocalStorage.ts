import { useCallback, useEffect, useRef, useState } from 'react';
import { backoff } from '@utils/async';

export function useLocalStorage<T>(key: string, initial: T): [T, (value: T | ((prev: T) => T)) => void] {
    const [value, setValue] = useState<T>(() => {
        if (typeof window === 'undefined') return initial;
        try {
            const stored = window.localStorage.getItem(key);
            if (stored === null) return initial;
            return JSON.parse(stored) as T;
        } catch {
            return initial;
        }
    });

    const set = useCallback(
        (next: T | ((prev: T) => T)) => {
            setValue((prev) => {
                const resolved = next instanceof Function ? (next as (p: T) => T)(prev) : next;
                try {
                    window.localStorage.setItem(key, JSON.stringify(resolved));
                } catch {
                    /* quota / privacy mode */
                }
                return resolved;
            });
        },
        [key],
    );

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key !== key) return;
            if (e.newValue === null) {
                setValue(initial);
                return;
            }
            try {
                setValue(JSON.parse(e.newValue) as T);
            } catch {
                /* ignore */
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, [key, initial]);

    return [value, set];
}
