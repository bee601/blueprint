import { Command } from 'cmdk';
import { useEffect, useMemo, useState } from 'react';
import { Modal } from '@components/ui/Modal';
import { useCommandPalette } from '@hooks/useCommandPalette';
import { cn } from '@utils/cn';
import { Search } from 'lucide-react';
import type { CommandItem } from '@/types';

export function CommandPalette() {
    const { open, setOpen, items, search, setSearch, filtered } = useCommandPalette();
    const [active, setActive] = useState(0);

    useEffect(() => {
        setActive(0);
    }, [search, open]);

    const grouped = useMemo(() => groupBy(filtered, (i) => i.group), [filtered]);

    return (
        <Modal open={open} onOpenChange={setOpen} size="lg" hideClose>
            <Command
                className="flex h-full max-h-[60vh] flex-col"
                label="Global command palette"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        const item = filtered[active];
                        if (item) {
                            e.preventDefault();
                            item.perform();
                            setOpen(false);
                        }
                    }
                }}
            >
                <div className="flex items-center gap-2 border-b border-border px-4">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Command.Input
                        value={search}
                        onValueChange={setSearch}
                        placeholder="Search servers, pages, settings…"
                        className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                    <kbd className="rounded border border-border bg-secondary/60 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">esc</kbd>
                </div>
                <Command.List className="flex-1 overflow-y-auto p-2">
                    {filtered.length === 0 ? (
                        <Command.Empty className="py-12 text-center text-sm text-muted-foreground">
                            No results. Try a different search.
                        </Command.Empty>
                    ) : (
                        grouped.map(([group, list]) => (
                            <Command.Group key={group} heading={group} className="space-y-1 px-1 pb-2">
                                {list.map((item) => {
                                    const idx = filtered.indexOf(item);
                                    return (
                                        <Command.Item
                                            key={item.id}
                                            onSelect={() => {
                                                item.perform();
                                                setOpen(false);
                                            }}
                                            onMouseEnter={() => setActive(idx)}
                                            className={cn(
                                                'flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-sm',
                                                active === idx ? 'bg-secondary text-foreground' : 'text-muted-foreground',
                                            )}
                                        >
                                            {item.icon && <span className="text-base">{item.icon}</span>}
                                            <span className="flex-1 truncate">{item.title}</span>
                                            {item.description && (
                                                <span className="hidden truncate text-xs text-muted-foreground/60 sm:inline">
                                                    {item.description}
                                                </span>
                                            )}
                                            {item.shortcut && (
                                                <span className="ml-2 flex gap-0.5 text-[10px] text-muted-foreground">
                                                    {item.shortcut.map((k) => (
                                                        <kbd
                                                            key={k}
                                                            className="rounded border border-border bg-secondary/60 px-1.5 py-0.5 font-mono"
                                                        >
                                                            {k}
                                                        </kbd>
                                                    ))}
                                                </span>
                                            )}
                                        </Command.Item>
                                    );
                                })}
                            </Command.Group>
                        ))
                    )}
                </Command.List>
                <div className="flex items-center justify-between border-t border-border px-3 py-2 text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1">
                            <kbd className="rounded border border-border bg-secondary/60 px-1.5 py-0.5 font-mono">↑↓</kbd>
                            navigate
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <kbd className="rounded border border-border bg-secondary/60 px-1.5 py-0.5 font-mono">↵</kbd>
                            open
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <kbd className="rounded border border-border bg-secondary/60 px-1.5 py-0.5 font-mono">esc</kbd>
                            close
                        </span>
                    </div>
                    <span className="opacity-60">{filtered.length} result{filtered.length === 1 ? '' : 's'}</span>
                </div>
            </Command>
        </Modal>
    );
}

function groupBy<T>(list: T[], key: (item: T) => string): Array<[string, T[]]> {
    const map = new Map<string, T[]>();
    for (const item of list) {
        const k = key(item);
        if (!map.has(k)) map.set(k, []);
        map.get(k)!.push(item);
    }
    return Array.from(map.entries());
}

export function useCommand(action: Omit<CommandItem, 'id'>) {
    const palette = useCommandPalette();
    return palette.register({ id: `cmd-${action.title}`, ...action });
}
