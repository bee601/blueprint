/**
 * Server health classifier — shared by status indicators, server cards, and
 * the admin monitoring grid. Centralizing the logic avoids each component
 * defining its own thresholds.
 */
export type ServerHealth = 'healthy' | 'warning' | 'critical' | 'unknown';

export function classifyCpu(percent: number): ServerHealth {
    if (percent < 60) return 'healthy';
    if (percent < 85) return 'warning';
    return 'critical';
}

export function classifyMemory(percent: number): ServerHealth {
    if (percent < 70) return 'healthy';
    if (percent < 90) return 'warning';
    return 'critical';
}

export function classifyDisk(percent: number): ServerHealth {
    if (percent < 75) return 'healthy';
    if (percent < 90) return 'warning';
    return 'critical';
}

export function healthColor(health: ServerHealth): string {
    switch (health) {
        case 'healthy':
            return 'text-success';
        case 'warning':
            return 'text-warning';
        case 'critical':
            return 'text-destructive';
        default:
            return 'text-muted-foreground';
    }
}

export function healthLabel(health: ServerHealth): string {
    switch (health) {
        case 'healthy':
            return 'Healthy';
        case 'warning':
            return 'Warning';
        case 'critical':
            return 'Critical';
        default:
            return 'Unknown';
    }
}
