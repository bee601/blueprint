import { useEffect, useState } from 'react';

export function useScrollPosition(): { x: number; y: number; direction: 'up' | 'down' | 'idle' } {
    const [position, setPosition] = useState({ x: 0, y: 0, direction: 'idle' as 'up' | 'down' | 'idle' });
    useEffect(() => {
        let lastY = window.scrollY;
        let frame: number | null = null;
        const onScroll = () => {
            if (frame !== null) return;
            frame = window.requestAnimationFrame(() => {
                const y = window.scrollY;
                setPosition({ x: window.scrollX, y, direction: y > lastY ? 'down' : y < lastY ? 'up' : 'idle' });
                lastY = y;
                frame = null;
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (frame !== null) window.cancelAnimationFrame(frame);
        };
    }, []);
    return position;
}
