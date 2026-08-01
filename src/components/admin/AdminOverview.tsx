import { cn } from '@utils/cn';
import { Activity, AlertTriangle, CheckCircle2, Clock, Cpu, Database, Globe, HardDrive, MemoryStick, Network, Server as ServerIcon, Shield, Users, type LucideIcon } from 'lucide-react';
import { StatCard } from '@components/ui/StatCard';
import { AreaChartCard, BarChartCard, DonutChart, LineChartCard, RadialGauge } from '@components/charts/Charts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card';
import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { Skeleton } from '@components/ui/Skeleton';
import { useMemo } from 'react';
import { formatBytes } from '@utils/format';

export interface AdminOverviewProps {
    stats?: {
        servers: number;
        online: number;
        nodes: number;
        users: number;
        cpu: number;
        memory: number;
        disk: number;
        bandwidth: number;
        pendingTickets?: number;
        recentErrors?: number;
        auditsToday?: number;
    };
    timeseries?: { labels: string[]; cpu: number[]; memory: number[] };
    serverDistribution?: { label: string; value: number; color?: string }[];
    nodeHealth?: { label: string; value: number }[];
    loading?: boolean;
    className?: string;
}

export function AdminOverview({ stats, timeseries, serverDistribution, nodeHealth, loading, className }: AdminOverviewProps) {
    const tsData = useMemo(() => {
        if (!timeseries) return [];
        return timeseries.labels.map((label, i) => ({
            label,
            cpu: timeseries.cpu[i] ?? 0,
            memory: timeseries.memory[i] ?? 0,
        }));
    }, [timeseries]);

    return (
        <div className={cn('space-y-6', className)}>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                <StatCard
                    label="Total servers"
                    value={stats?.servers ?? '—'}
                    icon={<ServerIcon className="h-5 w-5" />}
                    intent="primary"
                    loading={loading}
                />
                <StatCard
                    label="Online"
                    value={stats?.online ?? '—'}
                    description={`${stats ? Math.round((stats.online / Math.max(1, stats.servers)) * 100) : 0}% of fleet`}
                    icon={<Activity className="h-5 w-5" />}
                    intent="success"
                    loading={loading}
                />
                <StatCard
                    label="Nodes"
                    value={stats?.nodes ?? '—'}
                    icon={<Globe className="h-5 w-5" />}
                    intent="default"
                    loading={loading}
                />
                <StatCard
                    label="Users"
                    value={stats?.users ?? '—'}
                    icon={<Users className="h-5 w-5" />}
                    intent="default"
                    loading={loading}
                />
                <StatCard
                    label="CPU usage"
                    value={stats ? `${stats.cpu.toFixed(1)}%` : '—'}
                    icon={<Cpu className="h-5 w-5" />}
                    intent={stats && stats.cpu > 75 ? 'warning' : 'default'}
                    loading={loading}
                />
                <StatCard
                    label="Memory usage"
                    value={stats ? `${stats.memory.toFixed(1)}%` : '—'}
                    icon={<MemoryStick className="h-5 w-5" />}
                    intent={stats && stats.memory > 85 ? 'danger' : 'default'}
                    loading={loading}
                />
                <StatCard
                    label="Disk usage"
                    value={stats ? `${stats.disk.toFixed(1)}%` : '—'}
                    icon={<HardDrive className="h-5 w-5" />}
                    intent={stats && stats.disk > 90 ? 'danger' : 'default'}
                    loading={loading}
                />
                <StatCard
                    label="Bandwidth"
                    value={stats ? formatBytes(stats.bandwidth) : '—'}
                    icon={<Network className="h-5 w-5" />}
                    intent="default"
                    loading={loading}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>System load</CardTitle>
                                <CardDescription>CPU and memory across all nodes (last 24h)</CardDescription>
                            </div>
                            <Badge variant="success">Healthy</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loading ? <Skeleton className="h-60 w-full" /> : <AreaChartCard data={tsData} series={[{ dataKey: 'cpu', label: 'CPU' }, { dataKey: 'memory', label: 'Memory' }]} height={260} />}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Server types</CardTitle>
                        <CardDescription>Distribution by egg</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? <Skeleton className="h-60 w-full" /> : <DonutChart data={serverDistribution ?? []} centerLabel="servers" centerValue={stats?.servers} height={240} />}
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Node health</CardTitle>
                        <CardDescription>Disk used per node</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? <Skeleton className="h-60 w-full" /> : <BarChartCard data={nodeHealth ?? []} layout="vertical" height={260} unit="%" />}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>CPU average</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? <Skeleton className="h-60 w-full" /> : <RadialGauge value={stats?.cpu ?? 0} label="across fleet" height={240} />}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Operations</CardTitle>
                        <CardDescription>Audit & alerts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <OperationRow icon={CheckCircle2} label="Audits today" value={stats?.auditsToday ?? 0} intent="success" />
                        <OperationRow icon={AlertTriangle} label="Recent errors" value={stats?.recentErrors ?? 0} intent="warning" />
                        <OperationRow icon={Clock} label="Pending tickets" value={stats?.pendingTickets ?? 0} intent="default" />
                        <Button variant="secondary" block className="mt-2">
                            Open operations center
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function OperationRow({ icon: Icon, label, value, intent }: { icon: LucideIcon; label: string; value: number; intent: 'success' | 'warning' | 'danger' | 'default' }) {
    return (
        <div className="flex items-center justify-between rounded-lg border border-border bg-card/40 p-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="h-4 w-4" />
                {label}
            </div>
            <Badge
                variant={intent === 'success' ? 'success' : intent === 'warning' ? 'warning' : intent === 'danger' ? 'destructive' : 'secondary'}
            >
                {value}
            </Badge>
        </div>
    );
}
