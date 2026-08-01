import { formatDistanceToNow, format, parseISO } from 'date-fns';

/**
 * Human-friendly relative time ("3 minutes ago").
 */
export function timeAgo(input: string | Date | number): string {
    const date = typeof input === 'string' ? parseISO(input) : new Date(input);
    return formatDistanceToNow(date, { addSuffix: true });
}

/**
 * Absolute date in user's locale ("Jan 12, 2026 14:23").
 */
export function formatDate(input: string | Date | number, fmt = 'MMM d, yyyy HH:mm'): string {
    const date = typeof input === 'string' ? parseISO(input) : new Date(input);
    return format(date, fmt);
}

/**
 * Compact duration — accepts seconds, returns "2h 13m".
 */
export function formatDuration(seconds: number): string {
    if (!Number.isFinite(seconds) || seconds < 0) return '0s';
    const s = Math.floor(seconds);
    const units: Array<[number, string]> = [
        [60 * 60 * 24 * 365, 'y'],
        [60 * 60 * 24 * 30, 'mo'],
        [60 * 60 * 24, 'd'],
        [60 * 60, 'h'],
        [60, 'm'],
        [1, 's'],
    ];
    let remaining = s;
    const parts: string[] = [];
    for (const [unit, label] of units) {
        const v = Math.floor(remaining / unit);
        if (v > 0) {
            parts.push(`${v}${label}`);
            remaining -= v * unit;
        }
        if (parts.length === 2) break;
    }
    return parts.length ? parts.join(' ') : '0s';
}
