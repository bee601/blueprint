import { Plus, Search, Trash2, Wrench, Database as DatabaseIcon, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Badge } from '@components/ui/Badge';

export interface NestEggCardProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    items: Array<{ id: string; name: string; description?: string; enabled?: boolean }>;
    onAdd?: () => void;
    search?: string;
    onSearchChange?: (q: string) => void;
}

export function NestEggCard({ title, description, icon: Icon = Wrench, items, onAdd, search, onSearchChange }: NestEggCardProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-primary" /> {title}
                        </CardTitle>
                        {description && <CardDescription>{description}</CardDescription>}
                    </div>
                    <Button size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={onAdd}>
                        Add
                    </Button>
                </div>
            </CardHeader>
            {onSearchChange && (
                <div className="px-6 pb-2">
                    <Input
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={`Search ${title.toLowerCase()}…`}
                        leftIcon={<Search className="h-4 w-4" />}
                    />
                </div>
            )}
            <CardContent>
                {items.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                        No items found.
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {items.map((item) => (
                            <li
                                key={item.id}
                                className="group flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/40 p-3 text-sm transition-colors hover:border-primary/30"
                            >
                                <div className="min-w-0 flex-1 space-y-0.5">
                                    <p className="truncate font-medium">{item.name}</p>
                                    {item.description && (
                                        <p className="truncate text-xs text-muted-foreground">{item.description}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant={item.enabled ? 'success' : 'secondary'}>{item.enabled ? 'Active' : 'Disabled'}</Badge>
                                    <Button variant="ghost" size="icon-sm" className="opacity-0 transition-opacity group-hover:opacity-100">
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}

export function DatabaseCard({ database, onDelete, onRotate }: { database: { id: string; name: string; host: string; username: string; max_connections: number }; onDelete?: () => void; onRotate?: () => void }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-border bg-card/40 p-4">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/60">
                    <DatabaseIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                    <p className="font-medium">{database.name}</p>
                    <p className="text-xs text-muted-foreground">
                        {database.username}@{database.host} · {database.max_connections} connections max
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {onRotate && (
                    <Button size="sm" variant="ghost" onClick={onRotate}>
                        Rotate password
                    </Button>
                )}
                {onDelete && (
                    <Button size="sm" variant="destructive" onClick={onDelete}>
                        Delete
                    </Button>
                )}
            </div>
        </div>
    );
}