import { Activity, AlertTriangle, CheckCircle2, Clock, Inbox, Lock, MessageCircle, Power, Server as ServerIcon, Settings, Shield, UserCog, Users, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@utils/cn';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/Avatar';
import { Badge } from '@components/ui/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@components/ui/Tabs';
import { StatusIndicator } from '@components/ui/StatusIndicator';
import { timeAgo } from '@utils/format';
import type { AuditLog } from '@/types';

const EVENT_ICONS: Record<string, LucideIcon> = {
    'auth:login': Lock,
    'auth:failed': AlertTriangle,
    'auth:logout': Power,
    'server:created': ServerIcon,
    'server:deleted': ServerIcon,
    'server:suspended': AlertTriangle,
    'server:reinstalled': ServerIcon,
    'user:created': Users,
    'user:updated': UserCog,
    'user:deleted': Users,
    'settings:updated': Settings,
    'security:2fa': Shield,
    'backup:created': Inbox,
    'file:uploaded': Inbox,
};

export function AuditLogView({ logs, className }: { logs: AuditLog[]; className?: string }) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Audit log</CardTitle>
                <CardDescription>Every privileged action across the panel</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="auth">Auth</TabsTrigger>
                        <TabsTrigger value="servers">Servers</TabsTrigger>
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="system">System</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <AuditList logs={logs} />
                    </TabsContent>
                    <TabsContent value="auth">
                        <AuditList logs={logs.filter((l) => l.event.startsWith('auth'))} />
                    </TabsContent>
                    <TabsContent value="servers">
                        <AuditList logs={logs.filter((l) => l.event.startsWith('server'))} />
                    </TabsContent>
                    <TabsContent value="users">
                        <AuditList logs={logs.filter((l) => l.event.startsWith('user'))} />
                    </TabsContent>
                    <TabsContent value="system">
                        <AuditList logs={logs.filter((l) => l.event.startsWith('system'))} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}

function AuditList({ logs }: { logs: AuditLog[] }) {
    if (logs.length === 0) {
        return <div className="py-8 text-center text-sm text-muted-foreground">No activity yet.</div>;
    }
    return (
        <ul className="divide-y divide-border/60">
            {logs.map((log) => {
                const Icon = EVENT_ICONS[log.event] ?? Activity;
                return (
                    <li key={log.id} className="flex items-start gap-3 py-3 text-sm">
                        <span className={cn(
                            'mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-lg',
                            log.event.includes('failed') ? 'bg-destructive/15 text-destructive' :
                            log.event.includes('suspended') || log.event.includes('deleted') ? 'bg-warning/15 text-warning' :
                            'bg-primary/10 text-primary',
                        )}>
                            <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="flex-1 space-y-0.5">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{log.actor?.name ?? 'System'}</span>
                                <span className="text-xs text-muted-foreground">{log.description}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                <span>{log.action}</span>
                                {log.ip && <span>from <span className="font-mono">{log.ip}</span></span>}
                                <span>{timeAgo(log.timestamp)}</span>
                            </div>
                        </div>
                        <Badge variant="outline" className="font-mono text-[10px]">
                            {log.event}
                        </Badge>
                    </li>
                );
            })}
        </ul>
    );
}

export function ActivityFeed({ logs, className }: { logs: AuditLog[]; className?: string }) {
    return (
        <div className={cn('space-y-2', className)}>
            {logs.slice(0, 8).map((log) => {
                const Icon = EVENT_ICONS[log.event] ?? Activity;
                return (
                    <div key={log.id} className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/40 p-3 text-sm">
                        <Avatar className="h-7 w-7">
                            {log.actor?.id ? (
                                <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${log.actor.name ?? 'system'}`} alt={log.actor.name} />
                            ) : null}
                            <AvatarFallback><Icon className="h-3.5 w-3.5" /></AvatarFallback>
                        </Avatar>
                        <div className="flex-1 truncate">
                            <p className="truncate text-foreground">{log.description}</p>
                            <p className="text-xs text-muted-foreground">
                                {log.actor?.name ?? 'System'} · {timeAgo(log.timestamp)}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export function RecentActivityList({ logs }: { logs: AuditLog[] }) {
    return (
        <div className="space-y-3">
            {logs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-start gap-3 rounded-lg border border-border/40 bg-card/40 p-3 text-sm">
                    <span className="mt-1 flex h-2 w-2 rounded-full bg-primary" />
                    <div className="flex-1 space-y-0.5">
                        <p className="font-medium">{log.description}</p>
                        <p className="text-xs text-muted-foreground">
                            {timeAgo(log.timestamp)} · <span className="font-mono">{log.event}</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function RecentAlerts({ items }: { items: { id: string; title: string; severity: 'info' | 'warning' | 'critical'; timestamp: string }[] }) {
    return (
        <div className="space-y-2">
            {items.map((item) => (
                <div
                    key={item.id}
                    className={cn(
                        'flex items-start gap-3 rounded-lg border p-3 text-sm',
                        item.severity === 'info' && 'border-info/30 bg-info/5',
                        item.severity === 'warning' && 'border-warning/30 bg-warning/5',
                        item.severity === 'critical' && 'border-destructive/30 bg-destructive/5',
                    )}
                >
                    <StatusIndicator
                        status={item.severity === 'info' ? 'online' : item.severity === 'warning' ? 'warning' : 'error'}
                        pulse={false}
                        label=""
                    />
                    <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{timeAgo(item.timestamp)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function QuickLinks({ items }: { items: Array<{ label: string; href: string; icon: LucideIcon; count?: number }> }) {
    return (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {items.map((item) => {
                const Icon = item.icon;
                return (
                    <Link
                        key={item.href}
                        to={item.href}
                        className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/40 hover:bg-secondary/40"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="h-4 w-4" />
                        </span>
                        <span className="flex-1 text-sm font-medium">{item.label}</span>
                        {item.count != null && (
                            <Badge variant="secondary" className="text-[10px]">
                                {item.count}
                            </Badge>
                        )}
                    </Link>
                );
            })}
        </div>
    );
}

export { CheckCircle2, Clock, MessageCircle };