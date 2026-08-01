import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    PolarAngleAxis,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { useMemo, type ReactNode } from 'react';
import { cn } from '@utils/cn';

const CHART_PALETTE = ['#6C5CE7', '#8B5CF6', '#22C55E', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899', '#84CC16'];

export interface AreaSeriesPoint {
    label: string;
    [series: string]: number | string;
}

export interface AreaChartCardProps {
    data: AreaSeriesPoint[];
    series: { dataKey: string; label: string; color?: string }[];
    height?: number;
    className?: string;
    yLabel?: string;
    showGrid?: boolean;
    showLegend?: boolean;
    unit?: string;
}

export function AreaChartCard({ data, series, height = 240, className, yLabel, showGrid = true, showLegend = false, unit = '' }: AreaChartCardProps) {
    return (
        <div className={cn('w-full', className)} style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 6, right: 10, bottom: 6, left: 0 }}>
                    <defs>
                        {series.map((s, i) => (
                            <linearGradient key={s.dataKey} id={`grad-${s.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={s.color ?? CHART_PALETTE[i % CHART_PALETTE.length]} stopOpacity={0.5} />
                                <stop offset="100%" stopColor={s.color ?? CHART_PALETTE[i % CHART_PALETTE.length]} stopOpacity={0} />
                            </linearGradient>
                        ))}
                    </defs>
                    {showGrid && <CartesianGrid stroke="rgb(var(--border))" strokeDasharray="3 6" vertical={false} />}
                    <XAxis dataKey="label" tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 11 }} axisLine={false} tickLine={false} unit={unit} label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', fill: 'rgb(var(--muted-foreground))', fontSize: 11 } : undefined} />
                    <RechartsTooltip content={<ChartTooltip unit={unit} />} />
                    {showLegend && <Legend wrapperStyle={{ color: 'rgb(var(--muted-foreground))', fontSize: 11 }} />}
                    {series.map((s, i) => (
                        <Area
                            key={s.dataKey}
                            type="monotone"
                            dataKey={s.dataKey}
                            stroke={s.color ?? CHART_PALETTE[i % CHART_PALETTE.length]}
                            fill={`url(#grad-${s.dataKey})`}
                            strokeWidth={2}
                            activeDot={{ r: 4 }}
                            isAnimationActive
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export interface LineChartCardProps {
    data: AreaSeriesPoint[];
    series: { dataKey: string; label: string; color?: string }[];
    height?: number;
    className?: string;
    unit?: string;
}

export function LineChartCard({ data, series, height = 240, className, unit }: LineChartCardProps) {
    return (
        <div className={cn('w-full', className)} style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 6, right: 10, bottom: 6, left: 0 }}>
                    <CartesianGrid stroke="rgb(var(--border))" strokeDasharray="3 6" vertical={false} />
                    <XAxis dataKey="label" tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 11 }} axisLine={false} tickLine={false} unit={unit} />
                    <RechartsTooltip content={<ChartTooltip unit={unit} />} />
                    {series.map((s, i) => (
                        <Line
                            key={s.dataKey}
                            type="monotone"
                            dataKey={s.dataKey}
                            stroke={s.color ?? CHART_PALETTE[i % CHART_PALETTE.length]}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                            isAnimationActive
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export interface BarSeries {
    label: string;
    value: number;
    color?: string;
}

export function BarChartCard({ data, height = 220, className, unit, layout = 'horizontal' }: { data: BarSeries[]; height?: number; className?: string; unit?: string; layout?: 'horizontal' | 'vertical' }) {
    return (
        <div className={cn('w-full', className)} style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout={layout} margin={{ top: 6, right: 10, bottom: 6, left: 0 }}>
                    <CartesianGrid stroke="rgb(var(--border))" strokeDasharray="3 6" vertical={false} />
                    {layout === 'vertical' ? (
                        <>
                            <XAxis type="number" tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 11 }} axisLine={false} tickLine={false} unit={unit} />
                            <YAxis type="category" dataKey="label" tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
                        </>
                    ) : (
                        <>
                            <XAxis dataKey="label" tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 11 }} axisLine={false} tickLine={false} unit={unit} />
                        </>
                    )}
                    <RechartsTooltip content={<ChartTooltip unit={unit} />} cursor={{ fill: 'rgb(var(--secondary) / 0.4)' }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {data.map((entry, idx) => (
                            <Cell key={idx} fill={entry.color ?? CHART_PALETTE[idx % CHART_PALETTE.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export function DonutChart({ data, height = 220, className, centerLabel, centerValue }: { data: BarSeries[]; height?: number; className?: string; centerLabel?: string; centerValue?: ReactNode }) {
    return (
        <div className={cn('relative w-full', className)} style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <RechartsTooltip content={<ChartTooltip />} />
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="label"
                        innerRadius="60%"
                        outerRadius="100%"
                        paddingAngle={3}
                        stroke="none"
                    >
                        {data.map((entry, idx) => (
                            <Cell key={idx} fill={entry.color ?? CHART_PALETTE[idx % CHART_PALETTE.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            {(centerLabel || centerValue) && (
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    {centerValue && <div className="text-2xl font-semibold tracking-tight">{centerValue}</div>}
                    {centerLabel && <div className="text-xs text-muted-foreground">{centerLabel}</div>}
                </div>
            )}
        </div>
    );
}

export function RadialGauge({ value, max = 100, label, color = 'rgb(var(--primary))', height = 200, className }: { value: number; max?: number; label?: string; color?: string; height?: number; className?: string }) {
    const data = useMemo(() => [{ name: label ?? 'value', value: Math.min(100, (value / max) * 100), fill: color }], [value, max, label, color]);
    return (
        <div className={cn('relative w-full', className)} style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="65%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar dataKey="value" cornerRadius={12} background={{ fill: 'rgb(var(--secondary))' }} />
                </RadialBarChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-semibold tabular-nums">{Math.round((value / max) * 100)}%</div>
                {label && <div className="text-xs text-muted-foreground">{label}</div>}
            </div>
        </div>
    );
}

function ChartTooltip({ active, payload, label, unit }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border border-border bg-card/90 px-3 py-2 text-xs shadow-pop backdrop-blur">
            {label && <div className="font-medium text-foreground">{label}</div>}
            <div className="mt-1 space-y-1">
                {payload.map((p: any) => (
                    <div key={p.dataKey} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                        <span className="text-muted-foreground">{p.name}:</span>
                        <span className="font-mono font-medium text-foreground">
                            {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
                            {unit}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
