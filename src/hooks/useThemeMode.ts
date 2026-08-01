import { useEffect, useState } from 'react';
import type { ThemeMode } from '@/types';

export function useThemeMode(): [ThemeMode, (mode: ThemeMode) => void, 'light' | 'dark'] {
    const [mode, setMode] = useState<ThemeMode>(() => {
        if (typeof window === 'undefined') return 'dark';
        const stored = window.localStorage.getItem('blueprint.theme.mode') as ThemeMode | null;
        if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
        return 'dark';
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem('blueprint.theme.mode', mode);
    }, [mode]);

    const resolved = useResolvedMode(mode);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        document.documentElement.setAttribute('data-theme', resolved);
    }, [resolved]);

    return [mode, setMode, resolved];
}

function useResolvedMode(mode: ThemeMode): 'light' | 'dark' {
    const [resolved, setResolved] = useState<'light' | 'dark'>(() => resolve(mode));
    useEffect(() => setResolved(resolve(mode)), [mode]);
    return resolved;
}

function resolve(mode: ThemeMode): 'light' | 'dark' {
    if (mode === 'system') {
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        return 'dark';
    }
    return mode;
}
