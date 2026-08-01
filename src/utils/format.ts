import { formatBytes, formatBitsPerSecond } from './format/bytes';
import { timeAgo, formatDate, formatDuration } from './format/date';
import { semverCompare } from './format/semver';

export const format = {
    bytes: formatBytes,
    bps: formatBitsPerSecond,
    timeAgo,
    date: formatDate,
    duration: formatDuration,
    semverCompare,
    number(n: number, opts?: Intl.NumberFormatOptions): string {
        return new Intl.NumberFormat(undefined, opts).format(n);
    },
    percent(n: number, decimals = 0): string {
        return `${n.toFixed(decimals)}%`;
    },
};

export { formatBytes, formatBitsPerSecond, timeAgo, formatDate, formatDuration, semverCompare };
