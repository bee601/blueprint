/**
 * Convert any byte count to a human-readable string. 0 -> "0 B".
 */
export function formatBytes(bytes: number, decimals = 1, binary = false): string {
    if (!Number.isFinite(bytes) || bytes < 0) return '0 B';
    const base = binary ? 1024 : 1000;
    const units = binary
        ? ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB']
        : ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
    if (bytes < base) return `${bytes} ${units[0]}`;
    const exp = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(base)));
    const value = bytes / base ** exp;
    return `${value.toFixed(decimals)} ${units[exp]}`;
}

/**
 * Bit/s formatter. Pass in bytes-per-second and it produces "12.3 Mb/s" style output.
 */
export function formatBitsPerSecond(bps: number, decimals = 1): string {
    if (!Number.isFinite(bps) || bps < 0) return '0 b/s';
    const units = ['b/s', 'Kb/s', 'Mb/s', 'Gb/s', 'Tb/s'];
    if (bps < 1000) return `${bps.toFixed(0)} ${units[0]}`;
    const exp = Math.min(units.length - 1, Math.floor(Math.log(bps) / Math.log(1000)));
    return `${(bps / 1000 ** exp).toFixed(decimals)} ${units[exp]}`;
}
