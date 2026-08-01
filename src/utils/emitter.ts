/**
 * Tiny event-emitter used to coordinate cross-component state without
 * bringing in a heavier observable library. Used by the command palette,
 * notification center, and websocket console.
 */
export type Listener<T> = (payload: T) => void;

export class Emitter<EventMap extends Record<string, unknown>> {
    private listeners: { [K in keyof EventMap]?: Set<Listener<EventMap[K]>> } = {};

    on<K extends keyof EventMap>(event: K, listener: Listener<EventMap[K]>): () => void {
        const set = (this.listeners[event] ||= new Set<Listener<EventMap[K]>>());
        set.add(listener);
        return () => set.delete(listener);
    }

    emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): void {
        this.listeners[event]?.forEach((l) => {
            try {
                l(payload);
            } catch (err) {
                console.error(`[emitter] listener for "${String(event)}" threw:`, err);
            }
        });
    }

    clear<K extends keyof EventMap>(event?: K): void {
        if (event) {
            this.listeners[event]?.clear();
            return;
        }
        this.listeners = {};
    }
}
