import { cn } from '@utils/cn';
import { Bell, Check, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@components/ui/Button';
import { Badge } from '@components/ui/Badge';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/Popover';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@components/ui/Tabs';
import { EmptyState } from '@components/ui/EmptyState';
import { useNotifications } from '@hooks/useNotifications';
import { timeAgo } from '@utils/format';
import type { Notification as AppNotification } from '@/types';

const VARIANT_DOT: Record<AppNotification['variant'], string> = {
    default: 'bg-foreground',
    success: 'bg-success',
    error: 'bg-destructive',
    warning: 'bg-warning',
    info: 'bg-info',
};

export function NotificationCenter() {
    const { items, dismiss, clear } = useNotifications();
    const [open, setOpen] = useState(false);
    const unread = items.length;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label={`Notifications (${unread})`}>
                    <Bell className="h-4 w-4" />
                    {unread > 0 && (
                        <span className="absolute right-1 top-1 inline-flex h-2 w-2 rounded-full bg-destructive shadow-[0_0_8px_currentColor]" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-96 p-0">
                <header className="flex items-center justify-between border-b border-border px-4 py-3">
                    <div>
                        <p className="text-sm font-semibold">Notifications</p>
                        <p className="text-xs text-muted-foreground">{unread} unread</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => clear()} disabled={items.length === 0}>
                        Mark all read
                    </Button>
                </header>
                <Tabs defaultValue="all">
                    <div className="border-b border-border px-2 py-1">
                        <TabsList className="w-full justify-start">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="unread">Unread</TabsTrigger>
                            <TabsTrigger value="alerts">Alerts</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="all" className="mt-0 max-h-96 overflow-y-auto">
                        <List items={items} dismiss={dismiss} />
                    </TabsContent>
                    <TabsContent value="unread" className="mt-0 max-h-96 overflow-y-auto">
                        <List items={items.filter((i) => i.createdAt > Date.now() - 60_000 * 60)} dismiss={dismiss} />
                    </TabsContent>
                    <TabsContent value="alerts" className="mt-0 max-h-96 overflow-y-auto">
                        <List items={items.filter((i) => i.variant === 'warning' || i.variant === 'error')} dismiss={dismiss} />
                    </TabsContent>
                </Tabs>
                <footer className="border-t border-border px-4 py-2 text-center">
                    <Button variant="ghost" size="sm">
                        View all
                    </Button>
                </footer>
            </PopoverContent>
        </Popover>
    );
}

function List({ items, dismiss }: { items: AppNotification[]; dismiss: (id: string) => void }) {
    if (items.length === 0) {
        return (
            <div className="p-6">
                <EmptyState
                    icon={<Check className="h-5 w-5" />}
                    title="All caught up"
                    description="You're up to date — no new notifications."
                />
            </div>
        );
    }
    return (
        <ul className="divide-y divide-border/60">
            {items.map((n) => (
                <li
                    key={n.id}
                    className={cn('group relative flex items-start gap-3 px-4 py-3 text-sm', n.variant === 'error' && 'bg-destructive/5')}
                >
                    <span className={cn('mt-1 h-2 w-2 flex-none rounded-full shadow-[0_0_8px_currentColor]', VARIANT_DOT[n.variant])} />
                    <div className="flex-1">
                        <p className="font-medium">{n.title}</p>
                        {n.description && <p className="text-xs text-muted-foreground">{n.description}</p>}
                        <p className="mt-1 text-[10px] text-muted-foreground">{timeAgo(n.createdAt)}</p>
                        {n.action && (
                            <Button
                                size="sm"
                                variant="link"
                                className="mt-1 h-auto p-0 text-xs"
                                onClick={() => {
                                    n.action?.onClick();
                                    dismiss(n.id);
                                }}
                            >
                                {n.action.label}
                            </Button>
                        )}
                    </div>
                    <button
                        onClick={() => dismiss(n.id)}
                        className="text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
                        aria-label="Dismiss"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                </li>
            ))}
        </ul>
    );
}

export function NotificationPreferences() {
    return (
        <div className="space-y-3 text-sm">
            <Row label="Server events" description="Started, stopped, crashed" enabled />
            <Row label="Disk / Memory warnings" description="When usage exceeds thresholds" enabled />
            <Row label="New login alerts" description="Notify when a new IP signs in" enabled />
            <Row label="Scheduled task errors" description="Cron failures" enabled />
            <Row label="Marketing" description="Product updates & tips" enabled={false} />
        </div>
    );
}

function Row({ label, description, enabled }: { label: string; description: string; enabled?: boolean }) {
    return (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card/40 p-3">
            <div>
                <p className="font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <Badge variant={enabled ? 'success' : 'secondary'}>{enabled ? 'On' : 'Off'}</Badge>
        </div>
    );
}