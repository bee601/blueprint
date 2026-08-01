import { Settings as SettingsIcon, Server as ServerIcon, Database, Globe, Cpu, MemoryStick, HardDrive, Network, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card';
import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { ProgressBar } from '@components/ui/Progress';
import { StatusIndicator } from '@components/ui/StatusIndicator';
import { EmptyState } from '@components/ui/EmptyState';
import { formatBytes } from '@utils/format';
import type { Node, Server } from '@/types';

export function NodesTable({ nodes, servers, className }: { nodes: Node[]; servers: Server[]; className?: string }) {
    return (
        <Card className={className}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Nodes</CardTitle>
                        <CardDescription>{nodes.length} nodes across all locations</CardDescription>
                    </div>
                    <Button leftIcon={<Plus className="h-4 w-4" />}>New node</Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {nodes.length === 0 ? (
                    <EmptyState
                        icon={<ServerIcon className="h-5 w-5" />}
                        title="No nodes yet"
                        description="Add your first node to start scheduling servers."
                        action={<Button>Create node</Button>}
                    />
                ) : (
                    nodes.map((node) => {
                        const nodeServers = servers.filter((s) => s.node === node.name);
                        const usedMem = nodeServers.reduce((acc, s) => acc + s.limits.memory, 0);
                        const usedDisk = nodeServers.reduce((acc, s) => acc + s.limits.disk, 0);
                        const memPct = (usedMem / node.memory) * 100;
                        const diskPct = (usedDisk / node.disk) * 100;
                        return (
                            <Link
                                key={node.id}
                                to={`/admin/nodes/${node.id}`}
                                className="group flex items-center gap-4 rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-primary/40"
                            >
                                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-secondary/60">
                                    <ServerIcon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold">{node.name}</p>
                                        <Badge variant={node.public ? 'success' : 'secondary'}>
                                            {node.public ? 'Public' : 'Private'}
                                        </Badge>
                                        <StatusIndicator status={node.maintenance_mode === 'none' ? 'online' : 'warning'} pulse={false} label={node.maintenance_mode === 'none' ? 'Online' : node.maintenance_mode} />
                                    </div>
                                    <p className="font-mono text-xs text-muted-foreground">{node.fqdn}:{node.daemon_listen}</p>
                                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                                        <UsageLine icon={<MemoryStick className="h-3 w-3" />} label="Memory" value={memPct} detail={`${formatBytes(usedMem)} / ${formatBytes(node.memory)}`} />
                                        <UsageLine icon={<HardDrive className="h-3 w-3" />} label="Disk" value={diskPct} detail={`${formatBytes(usedDisk)} / ${formatBytes(node.disk)}`} />
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-sm font-medium">{nodeServers.length} servers</span>
                                    <span className="text-xs text-muted-foreground">{node.location_id}</span>
                                </div>
                            </Link>
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
}

function UsageLine({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: number; detail: string }) {
    const variant: 'primary' | 'warning' | 'danger' = value > 90 ? 'danger' : value > 75 ? 'warning' : 'primary';
    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                    {icon}
                    {label}
                </span>
                <span className="font-mono">{detail}</span>
            </div>
            <ProgressBar value={value} max={100} variant={variant} />
        </div>
    );
}

export function LocationsPanel({ locations }: { locations: { id: number; short: string; long?: string; nodeCount: number; serverCount: number }[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Locations</CardTitle>
                <CardDescription>Geographical regions servers can be deployed to.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="divide-y divide-border/60">
                    {locations.map((loc) => (
                        <li key={loc.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                            <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/60">
                                    <Globe className="h-4 w-4" />
                                </span>
                                <div>
                                    <p className="font-medium">{loc.long ?? loc.short}</p>
                                    <p className="text-xs text-muted-foreground">{loc.short}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>{loc.nodeCount} nodes</span>
                                <span>{loc.serverCount} servers</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}