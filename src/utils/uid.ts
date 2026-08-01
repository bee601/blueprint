/**
 * Returns a stable random-ish id (no Math.random in render path).
 * Combines timestamp + a monotonic counter to keep keys unique within a session.
 */
let counter = 0;
export function uid(prefix = 'bp'): string {
    counter = (counter + 1) & 0xffffffff;
    return `${prefix}_${Date.now().toString(36)}${counter.toString(36)}`;
}
