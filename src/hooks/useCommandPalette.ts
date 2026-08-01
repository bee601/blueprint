import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CommandItem } from '@/types';

export interface CommandPalette {
    open: boolean;
    setOpen: (open: boolean) => void;
    toggle: () => void;
    items: CommandItem[];
    register: (item: CommandItem) => () => void;
    search: string;
    setSearch: (q: string) => void;
    filtered: CommandItem[];
}

export function useCommandPalette(): CommandPalette {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<CommandItem[]>([]);
    const [search, setSearch] = useState('');

    const register = useCallback((item: CommandItem) => {
        setItems((prev) => {
            if (prev.some((p) => p.id === item.id)) {
                return prev.map((p) => (p.id === item.id ? item : p));
            }
            return [...prev, item];
        });
        return () => setItems((prev) => prev.filter((p) => p.id !== item.id));
    }, []);

    const filtered = useMemo(() => {
        if (!search.trim()) return items;
        const q = search.toLowerCase();
        return items.filter((item) => {
            if (item.title.toLowerCase().includes(q)) return true;
            if (item.description?.toLowerCase().includes(q)) return true;
            if (item.group.toLowerCase().includes(q)) return true;
            if (item.keywords?.some((k) => k.toLowerCase().includes(q))) return true;
            return false;
        });
    }, [items, search]);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                setOpen((p) => !p);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return {
        open,
        setOpen,
        toggle: () => setOpen((p) => !p),
        items,
        register,
        search,
        setSearch,
        filtered,
    };
}
