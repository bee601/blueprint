import { Shield, ShieldOff, KeyRound, AlertTriangle, Lock, Eye, Activity, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card';
import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { ProgressBar } from '@components/ui/Progress';

export function SecurityCenter() {
    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Security posture</CardTitle>
                    <CardDescription>Overall health of the panel's authentication and access controls.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <PostureItem icon={Shield} label="Two-factor authentication" status="optional" description="Enforced for admins only." score={70} />
                    <PostureItem icon={Lock} label="Session security" status="secure" description="All sessions are encrypted and signed." score={100} />
                    <PostureItem icon={KeyRound} label="API keys" status="secure" description="No keys older than 90 days." score={100} />
                    <PostureItem icon={Eye} label="Failed login attempts" status="warning" description="18 attempts in the last hour." score={45} />
                    <PostureItem icon={Globe} label="IP allowlist" status="unconfigured" description="Recommended for production." score={20} />
                    <PostureItem icon={Activity} label="Audit logging" status="secure" description="Capturing all privileged actions." score={100} />
                </CardContent>
            </Card>
        </div>
    );
}

function PostureItem({
    icon: Icon,
    label,
    status,
    description,
    score,
}: {
    icon: typeof Shield;
    label: string;
    status: 'secure' | 'optional' | 'warning' | 'critical' | 'unconfigured';
    description: string;
    score: number;
}) {
    const variant: 'success' | 'warning' | 'danger' | 'primary' =
        status === 'secure' ? 'success' : status === 'warning' ? 'warning' : status === 'critical' ? 'danger' : 'primary';
    const statusVariant = status === 'secure' ? 'success' : status === 'warning' ? 'warning' : status === 'critical' ? 'destructive' : 'secondary';
    return (
        <div className="space-y-2 rounded-xl border border-border bg-card/40 p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-secondary/60">
                        <Icon className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="font-medium">{label}</p>
                        <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                </div>
                <Badge variant={statusVariant as any}>{status}</Badge>
            </div>
            <ProgressBar value={score} variant={variant} />
        </div>
    );
}

export function SecurityEvents({ events }: { events: Array<{ id: string; title: string; ip?: string; time: string; severity: 'info' | 'warning' | 'critical' }> }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent security events</CardTitle>
                <CardDescription>Suspicious activity, blocked attempts, and policy violations.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="divide-y divide-border/60">
                    {events.map((e) => (
                        <li key={e.id} className="flex items-center gap-3 py-2 text-sm">
                            {e.severity === 'critical' ? (
                                <ShieldOff className="h-4 w-4 text-destructive" />
                            ) : e.severity === 'warning' ? (
                                <AlertTriangle className="h-4 w-4 text-warning" />
                            ) : (
                                <Shield className="h-4 w-4 text-info" />
                            )}
                            <span className="flex-1">{e.title}</span>
                            {e.ip && <span className="font-mono text-xs text-muted-foreground">{e.ip}</span>}
                            <span className="text-xs text-muted-foreground">{e.time}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-3 flex justify-end">
                    <Button variant="ghost" size="sm">
                        View all
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}