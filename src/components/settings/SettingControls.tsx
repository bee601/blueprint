import { useState } from 'react';
import { cn } from '@utils/cn';
import { ChevronDown, Search, X } from 'lucide-react';
import { Input } from '@components/ui/Input';
import { ToggleGroup } from '@components/ui/Toggle';
import type { CategoryDef } from '@config/settings.schema';

export function SettingSidebar({ categories, active, onSelect }: { categories: CategoryDef[]; active: string; onSelect: (id: string) => void }) {
    return (
        <nav className="space-y-1 text-sm">
            {categories.map((cat) => {
                const total = cat.groups.reduce((acc, g) => acc + g.settings.length, 0);
                return (
                    <button
                        key={cat.id}
                        onClick={() => onSelect(cat.id)}
                        className={cn(
                            'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition-colors',
                            active === cat.id ? 'bg-secondary/60 text-foreground' : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground',
                        )}
                    >
                        <span>{cat.label}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">{total}</span>
                    </button>
                );
            })}
        </nav>
    );
}

export function SearchableSettingList({ items }: { items: Array<{ key: string; label: string; description?: string; category: string }> }) {
    const [q, setQ] = useState('');
    const filtered = q.trim()
        ? items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()) || i.key.toLowerCase().includes(q.toLowerCase()))
        : items;
    return (
        <div className="space-y-3">
            <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search settings…"
                leftIcon={<Search className="h-4 w-4" />}
                rightIcon={q ? (
                    <button onClick={() => setQ('')} aria-label="Clear">
                        <X className="h-4 w-4" />
                    </button>
                ) : null}
            />
            <ul className="divide-y divide-border/60 rounded-2xl border border-border bg-card">
                {filtered.map((i) => (
                    <li key={i.key} className="flex items-center gap-3 px-4 py-3 text-sm">
                        <span className="font-mono text-xs text-muted-foreground">{i.key}</span>
                        <span className="flex-1 truncate">{i.label}</span>
                        {i.description && <span className="hidden truncate text-xs text-muted-foreground lg:inline">{i.description}</span>}
                        <span className="rounded-md bg-secondary/40 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{i.category}</span>
                    </li>
                ))}
                {filtered.length === 0 && (
                    <li className="px-4 py-8 text-center text-sm text-muted-foreground">No settings matched.</li>
                )}
            </ul>
        </div>
    );
}

export function SettingSection({ title, description, children, advanced, experimental }: { title: string; description?: string; children: React.ReactNode; advanced?: boolean; experimental?: boolean }) {
    return (
        <section className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-card">
            <header className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold tracking-tight">{title}</h2>
                    {description && <p className="text-sm text-muted-foreground">{description}</p>}
                </div>
                {experimental ? (
                    <span className="rounded-md bg-warning/15 px-1.5 py-0.5 text-[10px] font-medium text-warning">Experimental</span>
                ) : advanced ? (
                    <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">Advanced</span>
                ) : null}
            </header>
            <div className="space-y-4">{children}</div>
        </section>
    );
}

export function Accordion({ items }: { items: Array<{ id: string; title: string; content: React.ReactNode; defaultOpen?: boolean }> }) {
    return (
        <div className="space-y-1">
            {items.map((item) => (
                <AccordionItem key={item.id} {...item} />
            ))}
        </div>
    );
}

function AccordionItem({ id, title, content, defaultOpen = false }: { id: string; title: string; content: React.ReactNode; defaultOpen?: boolean }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium"
                aria-expanded={open}
                aria-controls={id}
            >
                <span>{title}</span>
                <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
            </button>
            {open && (
                <div id={id} className="border-t border-border bg-card/60 px-4 py-3 text-sm text-muted-foreground">
                    {content}
                </div>
            )}
        </div>
    );
}

export function SegmentedControl<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: Array<{ value: T; label: string }> }) {
    return (
        <ToggleGroup
            value={value}
            onValueChange={(v) => onChange(v as T)}
            options={options.map((o) => ({ value: o.value, label: o.label }))}
        />
    );
}