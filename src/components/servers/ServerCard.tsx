import { ArrowRight, ChevronRight, Cpu, HardDrive, MemoryStick, Network, Pause, Play, Power, RotateCw, Square, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@components/ui/DropdownMenu';
import { ProgressBar } from '@components/ui/Progress';
import { StatusIndicator } from '@components/ui/StatusIndicator';
import { formatBytes, formatDuration } from '@utils/format';
import { classifyCpu, classifyMemory, classifyDisk } from '@utils/health';
import type { Server, ServerStat } from '@/types';
import { cn } from '@utils/cn';

export interface ServerCardProps {
    server: Server;
    stats?: ServerStat;
    href?: string;
    onPowerAction?: (action: PowerAction) => void;
    className?: string;
}

export type PowerAction = 'start' | 'stop' | 'restart' | 'kill';

const STATE_LABELS: Record<string, string> = {
    running: 'Online',
    starting: 'Starting',
    stopping: 'Stopping',
    stopped: 'Offline',
    crashed: 'Crashed',
    installing: 'Installing',
};

export function ServerCard({ server, stats, href, onPowerAction, className }: ServerCardProps) {
    const status = (server.status ?? 'unknown') as keyof typeof STATE_LABELS;
    const cpuPct = stats?.cpu_percent ?? 0;
    const memPct = stats?.memory_limit_bytes ? (stats.memory_bytes / stats.memory_limit_bytes) * 100 : 0;
    const diskPct = stats?.disk_limit_bytes ? (stats.disk_bytes / stats.disk_limit_bytes) * 100 : 0;
    return (
        <Card
            variant="default"
            hoverable
            className={cn('group flex flex-col gap-4 p-5', className)}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                    <div
                        className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-xl text-base font-semibold uppercase',
                            status === 'running' ? 'bg-success/15 text-success' : 'bg-secondary text-muted-foreground',
                        )}
                    >
                        {server.name.slice(0, 1)}
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="text-base font-semibold tracking-tight">{server.name}</h3>
                        <p className="text-xs text-muted-foreground">{server.description || `Node ${server.node}`}</p>
                    </div>
                </div>
                <StatusIndicator status={status === 'running' ? 'online' : status as any} label={STATE_LABELS[status] ?? status} />
            </div>

            <div className="space-y-2.5">
                <UsageRow icon={<Cpu className="h-3.5 w-3.5" />} label="CPU" value={cpuPct} max={100} health={classifyCpu(cpuPct)} suffix="%" />
                <UsageRow icon={<MemoryStick className="h-3.5 w-3.5" />} label="Memory" value={memPct} max={100} health={classifyMemory(memPct)} suffix="%" detail={stats ? `${formatBytes(stats.memory_bytes)} / ${formatBytes(stats.memory_limit_bytes)}` : undefined} />
                <UsageRow icon={<HardDrive className="h-3.5 w-3.5" />} label="Disk" value={diskPct} max={100} health={classifyDisk(diskPct)} suffix="%" detail={stats ? `${formatBytes(stats.disk_bytes)} / ${formatBytes(stats.disk_limit_bytes)}` : undefined} />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                        <Network className="h-3 w-3" />
                        {server.allocation ? `${server.allocation.ip}:${server.allocation.port}` : 'N/A'}
                    </span>
                    {stats?.uptime != null && (
                        <span className="inline-flex items-center gap-1">
                            <RotateCw className="h-3 w-3" /> {formatDuration(stats.uptime)}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    {status === 'running' && (
                        <Button size="icon-sm" variant="ghost" onClick={() => onPowerAction?.('stop')} title="Stop">
                            <Square className="h-3.5 w-3.5" />
                        </Button>
                    )}
                    {status !== 'running' && (
                        <Button size="icon-sm" variant="ghost" onClick={() => onPowerAction?.('start')} title="Start">
                            <Play className="h-3.5 w-3.5" />
                        </Button>
                    )}
                    <Button size="icon-sm" variant="ghost" onClick={() => onPowerAction?.('restart')} title="Restart">
                        <RotateCw className="h-3.5 w-3.5" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon-sm" variant="ghost" title="More">
                                <ChevronRight className="h-3.5 w-3.5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Terminal className="h-4 w-4" /> Console
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Power className="h-4 w-4" /> Send signal
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem destructive>
                                <Pause className="h-4 w-4" /> Suspend
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {href && (
                <Link
                    to={href}
                    className="absolute inset-0 z-10 rounded-2xl"
                    aria-label={`Open ${server.name}`}
                >
                    <span className="sr-only">Open</span>
                </Link>
            )}
        </Card>
    );
}

function UsageRow({ icon, label, value, max, health, suffix, detail }: { icon: React.ReactNode; label: string; value: number; max: number; health: 'healthy' | 'warning' | 'critical' | 'unknown'; suffix?: string; detail?: string }) {
    const variant = health === 'healthy' ? 'primary' : health === 'warning' ? 'warning' : health === 'critical' ? 'danger' : 'primary';
    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                    {icon}
                    <span>{label}</span>
                    {detail && <span className="text-[10px] text-muted-foreground/60">{detail}</span>}
                </span>
                <span className="font-mono tabular-nums text-foreground/80">
                    {Math.round(value)}
                    {suffix}
                </span>
            </div>
            <ProgressBar value={value} max={max} variant={variant} />
        </div>
    );
}

export function ServerListHeader({ count, label, onNewServer }: { count: number; label?: string; onNewServer?: () => void }) {
    return (
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <div>
                <h2 className="text-lg font-semibold tracking-tight">{label ?? 'Your servers'}</h2>
                <p className="text-xs text-muted-foreground">
                    {count} {count === 1 ? 'server' : 'servers'} in total
                </p>
            </div>
            <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />} onClick={onNewServer}>
                New server
            </Button>
        </div>
    );
}

export function ServerCardSkeleton() {
    return (
        <Card className="p-5">
            <div className="flex items-center gap-3">
                <div className="skeleton h-10 w-10 rounded-xl" />
                <div className="flex-1 space-y-2">
                    <div className="skeleton h-4 w-1/3" />
                    <div className="skeleton h-3 w-1/2" />
                </div>
            </div>
            <div className="mt-5 space-y-3">
                <div className="skeleton h-2 w-full" />
                <div className="skeleton h-2 w-full" />
                <div className="skeleton h-2 w-full" />
            </div>
        </Card>
    );
}
