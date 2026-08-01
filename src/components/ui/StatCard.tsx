import { cn } from '@utils/cn';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

export interface StatCardProps {
    label: string;
    value: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    delta?: { value: number; direction: 'up' | 'down' | 'flat'; suffix?: string };
    trend?: number[];
    intent?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    loading?: boolean;
    className?: string;
    href?: string;
    onClick?: () => void;
}

const intentAccent: Record<NonNullable<StatCardProps['intent']>, string> = {
    default: 'text-foreground',
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-destructive',
};

export function StatCard({ label, value, description, icon, delta, intent = 'default', loading, className, onClick, href, trend }: StatCardProps) {
    const Comp: any = href ? 'a' : onClick ? 'button' : 'div';
    const sparkPath = useMemo(() => buildSparkPath(trend), [trend]);
    return (
        <Comp
            href={href}
          onClick={onClick}
          className={cn(
                'group relative w-full overflow-hidden rounded-2xl border border-border bg-card p-5 text-left shadow-card transition-all duration-300 ease-out-expo',
                'hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card-hover',
                (onClick || href) && 'cursor-pointer',
                className,
            )}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                    {loading ? (
                        <div className="skeleton mt-2 h-7 w-24" />
                    ) : (
                        <p className={cn('text-2xl font-semibold tracking-tight tabular-nums', intentAccent[intent])}>{value}</p>
                    )}
                    {description && !loading && (
                        <p className="text-xs text-muted-foreground">{description}</p>
                    )}
                </div>
                {icon && (
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/60 text-foreground/80', intentAccent[intent])}>
                        {icon}
                    </div>
                )}
            </div>
            {(delta || (trend && trend.length > 1)) && (
                <div className="mt-3 flex items-end justify-between gap-3">
                    {delta && (
                        <div
                            className={cn(
                                'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium',
                                delta.direction === 'up' && 'bg-success/10 text-success',
                                delta.direction === 'down' && 'bg-destructive/10 text-destructive',
                                delta.direction === 'flat' && 'bg-secondary text-muted-foreground',
                            )}
                        >
                            {delta.direction === 'up' && <ArrowUp className="h-3 w-3" />}
                            {delta.direction === 'down' && <ArrowDown className="h-3 w-3" />}
                            {delta.direction === 'flat' && <ArrowUpDown className="h-3 w-3" />}
                            <span className="tabular-nums">
                                {Math.abs(delta.value)}
                                {delta.suffix ?? '%'}
                            </span>
                        </div>
                    )}
                    {trend && trend.length > 1 && (
                        <svg
                            viewBox="0 0 100 30"
                            preserveAspectRatio="none"
                            className="h-8 w-24 text-primary/70"
                            aria-hidden
                        >
                            <defs>
                                <linearGradient id="sparkGrad" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d={`${sparkPath} L 100 30 L 0 30 Z`} fill="url(#sparkGrad)" />
                            <path d={sparkPath} fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    )}
                </div>
            )}
        </Comp>
    );
}

function buildSparkPath(values?: number[]): string {
    if (!values || values.length < 2) return '';
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    return values
        .map((v, i) => {
            const x = (i / (values.length - 1)) * 100;
            const y = 30 - ((v - min) / range) * 28 - 1;
            return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
        })
        .join(' ');
}
