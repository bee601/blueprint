/**
 * Sleep helper for animation orchestration, polling, and retry delays.
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Exponential backoff with jitter — used by usePteroAPI retry logic.
 */
export function backoff(attempt: number, base = 300, cap = 8000): number {
    const exp = Math.min(cap, base * 2 ** attempt);
    const jitter = Math.random() * 0.3 * exp;
    return exp + jitter;
}
