import { cn } from '@utils/cn';
import type { LucideIcon } from 'lucide-react';
import { Sparkles, Zap, Wrench, FlaskConical } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card';
import { Badge } from '@components/ui/Badge';
import { ProgressBar } from '@components/ui/Progress';

export interface SettingCategoryCardProps {
    id: string;
    label: string;
    description?: string;
    icon?: LucideIcon;
    settingCount: number;
    advancedCount?: number;
    experimentalCount?: number;
    modifiedCount?: number;
    onClick?: () => void;
    className?: string;
}

export function SettingCategoryCard({
    id,
    label,
    description,
    icon: Icon,
    settingCount,
    advancedCount = 0,
    experimentalCount = 0,
    modifiedCount = 0,
    onClick,
    className,
}: SettingCategoryCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'group relative flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5 text-left shadow-card transition-all duration-200 ease-out-expo',
                'hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card-hover',
                className,
            )}
            data-category={id}
        >
            <div className="flex w-full items-start justify-between gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {Icon ? <Icon className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                </span>
                {modifiedCount > 0 && <Badge variant="primary">{modifiedCount} modified</Badge>}
            </div>
            <div className="space-y-0.5">
                <p className="font-semibold">{label}</p>
                {description && <p className="text-xs text-muted-foreground">{description}</p>}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground">
                <Badge variant="outline">{settingCount} settings</Badge>
                {advancedCount > 0 && (
                    <Badge variant="outline" className="gap-1">
                        <Wrench className="h-3 w-3" /> {advancedCount}
                    </Badge>
                )}
                {experimentalCount > 0 && (
                    <Badge variant="warning" className="gap-1">
                        <FlaskConical className="h-3 w-3" /> {experimentalCount}
                    </Badge>
                )}
            </div>
        </button>
    );
}

export function SettingProgress({ value, max = 100, label, description }: { value: number; max?: number; label?: string; description?: string }) {
    return (
        <div className="space-y-1">
            {label && (
                <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-mono">{value}%</span>
                </div>
            )}
            <ProgressBar value={value} max={max} />
            {description && <p className="text-[10px] text-muted-foreground">{description}</p>}
        </div>
    );
}

export function SettingStorageBar({ usedMb, totalMb }: { usedMb: number; totalMb: number }) {
    const pct = (usedMb / totalMb) * 100;
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-primary" /> Storage
                </CardTitle>
                <CardDescription>Used by assets, backups, and uploads.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <SettingProgress value={pct} label={`${usedMb} MB / ${totalMb} MB`} />
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <Stat label="Assets" value={`${Math.round(usedMb * 0.4)} MB`} />
                    <Stat label="Backups" value={`${Math.round(usedMb * 0.45)} MB`} />
                    <Stat label="Other" value={`${Math.round(usedMb * 0.15)} MB`} />
                </div>
            </CardContent>
        </Card>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border border-border bg-card/40 p-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
            <p className="font-mono text-sm">{value}</p>
        </div>
    );
}