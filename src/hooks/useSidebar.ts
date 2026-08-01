import { useEffect, useState } from 'react';

export type SidebarState = 'expanded' | 'collapsed';

export function useSidebar(): {
    state: SidebarState;
    setState: (s: SidebarState) => void;
    toggle: () => void;
    isMobile: boolean;
} {
    const isMobile = useMediaQuery('(max-width: 1024px)');
    const [state, setState] = useState<SidebarState>('expanded');
    useEffect(() => {
        if (isMobile) setState('collapsed');
    }, [isMobile]);
    return {
        state,
        setState,
        toggle: () => setState((s) => (s === 'expanded' ? 'collapsed' : 'expanded')),
        isMobile,
    };
}

import { useMediaQuery } from './useMediaQuery';
