/**
 * Conditional await — like Promise.all but with optional, dependency-aware jobs.
 * Returns the awaited results and any errors in a structured object.
 */
export async function safeAll<T extends Record<string, unknown>>(
    jobs: { [K in keyof T]: Promise<T[K]> | T[K] },
): Promise<{ data: T; errors: Partial<Record<keyof T, Error>> }> {
    const entries = Object.entries(jobs) as [keyof T, Promise<T[keyof T]> | T[keyof T>][];
    const settled = await Promise.allSettled(entries.map(([, v]) => Promise.resolve(v)));
    const data: Record<string, unknown> = {};
    const errors: Record<string, Error> = {};
    settled.forEach((res, idx) => {
        const key = entries[idx][0];
        if (res.status === 'fulfilled') {
            data[key as string] = res.value;
        } else {
            errors[key as string] = res.reason instanceof Error ? res.reason : new Error(String(res.reason));
        }
    });
    return { data: data as T, errors: errors as Partial<Record<keyof T, Error>> };
}
