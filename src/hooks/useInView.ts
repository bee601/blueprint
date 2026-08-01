import { useEffect, useRef, useState } from 'react';

export function useInView<T extends Element = HTMLDivElement>(options: IntersectionObserverInit = { threshold: 0.15 }) {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => setInView(entry.isIntersecting));
        }, options);
        observer.observe(el);
        return () => observer.disconnect();
    }, [options]);
    return [ref, inView] as const;
}
