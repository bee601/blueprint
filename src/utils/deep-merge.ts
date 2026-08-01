/**
 * Hierarchical utility for merging deeply-nested config objects. The settings
 * engine uses this when applying a preset on top of the user's overrides on
 * top of the defaults — first key that exists wins.
 */
export function deepMerge<T extends Record<string, unknown>>(...sources: Array<Partial<T> | undefined>): T {
    const out: Record<string, unknown> = {};
    for (const source of sources) {
        if (!source) continue;
        for (const [key, value] of Object.entries(source)) {
            const existing = out[key];
            if (isPlainObject(value) && isPlainObject(existing)) {
                out[key] = deepMerge(existing, value);
            } else if (value !== undefined) {
                out[key] = value;
            }
        }
    }
    return out as T;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
}
