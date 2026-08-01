import { useCallback, useEffect, useRef, useState } from 'react';

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseAsyncResult<T, Args extends unknown[]> {
    data: T | null;
    error: Error | null;
    status: AsyncStatus;
    call: (...args: Args) => Promise<T | null>;
    reset: () => void;
    set: (next: T | null) => void;
}

/**
 * Tiny async state manager — no extra dependencies. Returns a memoized
 * call function you can wire into event handlers, plus the current status.
 */
export function useAsync<T, Args extends unknown[] = []>(fn: (...args: Args) => Promise<T>): UseAsyncResult<T, Args> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<AsyncStatus>('idle');
    const mounted = useRef(true);
    const fnRef = useRef(fn);
    fnRef.current = fn;

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    const call = useCallback(async (...args: Args) => {
        setStatus('loading');
        setError(null);
        try {
            const result = await fnRef.current(...args);
            if (!mounted.current) return null;
            setData(result);
            setStatus('success');
            return result;
        } catch (err) {
            if (!mounted.current) return null;
            const wrapped = err instanceof Error ? err : new Error(String(err));
            setError(wrapped);
            setStatus('error');
            return null;
        }
    }, []);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setStatus('idle');
    }, []);

    return { data, error, status, call, reset, set: setData };
}
