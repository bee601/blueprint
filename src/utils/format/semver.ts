/**
 * Lowercase, hyphen/underscore agnostic, optional "v"-strip — for the
 * settings engine to compare semver-like theme values.
 */
export function semverCompare(a: string, b: string): number {
    const pa = a.replace(/^v/i, '').split(/[.\-_]/).map(Number);
    const pb = b.replace(/^v/i, '').split(/[.\-_]/).map(Number);
    const len = Math.max(pa.length, pb.length);
    for (let i = 0; i < len; i++) {
        const na = pa[i] ?? 0;
        const nb = pb[i] ?? 0;
        if (na > nb) return 1;
        if (na < nb) return -1;
    }
    return 0;
}
