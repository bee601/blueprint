import { useState, useEffect, useMemo } from 'react';
import { cn } from '@utils/cn';
import { Search, Plus, Upload, Download, RefreshCcw, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';

export interface DataTableToolbarProps {
    search?: string;
    onSearchChange?: (next: string) => void;
    placeholder?: string;
    actions?: React.ReactNode;
    leftActions?: React.ReactNode;
    className?: string;
}

export function DataTableToolbar({ search = '', onSearchChange, placeholder = 'Search…', actions, leftActions, className }: DataTableToolbarProps) {
    return (
        <div className={cn('flex flex-wrap items-center gap-2', className)}>
            <div className="flex flex-1 items-center gap-2">
                {onSearchChange && (
                    <Input
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={placeholder}
                        leftIcon={<Search className="h-4 w-4" />}
                        rightIcon={search ? (
                            <button onClick={() => onSearchChange('')} aria-label="Clear search">
                                <X className="h-4 w-4" />
                            </button>
                        ) : null}
                        wrapperClassName="max-w-xs flex-1"
                    />
                )}
                {leftActions}
            </div>
            <div className="flex flex-wrap items-center gap-2">{actions}</div>
        </div>
    );
}

export interface PaginationProps {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
    className?: string;
}

export function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange, className }: PaginationProps) {
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, total);
    return (
        <div className={cn('flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground', className)}>
            <div>
                {total > 0 ? `Showing ${start}-${end} of ${total}` : 'No results'}
            </div>
            <div className="flex items-center gap-2">
                {onPageSizeChange && (
                    <select
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        className="rounded-md border border-input bg-background/40 px-2 py-1 text-xs"
                    >
                        {[10, 25, 50, 100].map((s) => (
                            <option key={s} value={s}>
                                {s} / page
                            </option>
                        ))}
                    </select>
                )}
                <Button variant="ghost" size="icon-sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-mono text-foreground">{page} / {pageCount}</span>
                <Button variant="ghost" size="icon-sm" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export interface FilterChip {
    id: string;
    label: string;
    value: string;
    onRemove?: () => void;
}

export function FilterChips({ chips, onClear, className }: { chips: FilterChip[]; onClear?: () => void; className?: string }) {
    if (chips.length === 0) return null;
    return (
        <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
            {chips.map((c) => (
                <button
                    key={c.id}
                    onClick={c.onRemove}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-xs hover:border-primary/40"
                >
                    <span className="text-muted-foreground">{c.label}:</span>
                    <span className="font-medium">{c.value}</span>
                    <X className="h-3 w-3 text-muted-foreground" />
                </button>
            ))}
            {onClear && (
                <button onClick={onClear} className="text-xs text-primary hover:underline">
                    Clear all
                </button>
            )}
        </div>
    );
}

export function useTableState<T>(items: T[], initialPageSize = 25) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<{ key: keyof T | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

    const filtered = useMemo(() => {
        if (!search.trim()) return items;
        const q = search.toLowerCase();
        return items.filter((item) => JSON.stringify(item).toLowerCase().includes(q));
    }, [items, search]);

    const sorted = useMemo(() => {
        if (!sort.key) return filtered;
        return [...filtered].sort((a, b) => {
            const va = a[sort.key!];
            const vb = b[sort.key!];
            if (va == null && vb == null) return 0;
            if (va == null) return 1;
            if (vb == null) return -1;
            if (typeof va === 'number' && typeof vb === 'number') {
                return sort.direction === 'asc' ? va - vb : vb - va;
            }
            return sort.direction === 'asc'
                ? String(va).localeCompare(String(vb))
                : String(vb).localeCompare(String(va));
        });
    }, [filtered, sort]);

    const paginated = useMemo(() => {
        const start = (page - 1) * pageSize;
        return sorted.slice(start, start + pageSize);
    }, [sorted, page, pageSize]);

    useEffect(() => {
        setPage(1);
    }, [search, pageSize]);

    return {
        page,
        setPage,
        pageSize,
        setPageSize,
        search,
        setSearch,
        sort,
        setSort,
        filtered,
        paginated,
        total: filtered.length,
    };
}

export { Plus, Upload, Download, RefreshCcw };