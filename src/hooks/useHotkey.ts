import { useEffect, useRef } from 'react';

export type HotkeyHandler = (event: KeyboardEvent) => void;

const SEQUENCE_DELAY_MS = 900;

export function useHotkey(combo: string, handler: HotkeyHandler, enabled = true): void {
    const handlerRef = useRef(handler);
    handlerRef.current = handler;
    const sequenceRef = useRef<string[]>([]);
    const sequenceTimer = useRef<number | null>(null);

    useEffect(() => {
        if (!enabled) return;
        const parts = combo.toLowerCase().split(' ').filter(Boolean);
        const isSequence = parts.length > 1;

        const onKey = (event: KeyboardEvent) => {
            if (event.repeat) return;
            if (isSequence) {
                const key = normalizeKey(event);
                sequenceRef.current.push(key);
                if (sequenceTimer.current) window.clearTimeout(sequenceTimer.current);
                sequenceTimer.current = window.setTimeout(() => (sequenceRef.current = []), SEQUENCE_DELAY_MS);
                const matched = parts.every((p, i) => sequenceRef.current[i] === p);
                if (matched) {
                    event.preventDefault();
                    handlerRef.current(event);
                    sequenceRef.current = [];
                }
                return;
            }
            const expected = parts[0];
            if (!matches(event, expected)) return;
            event.preventDefault();
            handlerRef.current(event);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [combo, enabled]);
}

function normalizeKey(event: KeyboardEvent): string {
    const parts: string[] = [];
    if (event.metaKey) parts.push('mod');
    else if (event.ctrlKey) parts.push('ctrl');
    if (event.altKey) parts.push('alt');
    if (event.shiftKey) parts.push('shift');
    parts.push(event.key.toLowerCase());
    return parts.join('+');
}

function matches(event: KeyboardEvent, combo: string): boolean {
    const tokens = combo.split('+').map((t) => t.trim().toLowerCase());
    const key = event.key.toLowerCase();
    const requiredKey = tokens[tokens.length - 1];
    if (requiredKey !== key) return false;
    const wantMod = tokens.includes('mod') || tokens.includes('cmd') || tokens.includes('meta');
    const wantCtrl = tokens.includes('ctrl');
    const wantAlt = tokens.includes('alt');
    const wantShift = tokens.includes('shift');
    const hasMod = event.metaKey || event.ctrlKey;
    if (wantMod && !hasMod) return false;
    if (wantCtrl && !event.ctrlKey) return false;
    if (wantAlt && !event.altKey) return false;
    if (wantShift && !event.shiftKey) return false;
    if (!wantShift && event.shiftKey && requiredKey.length === 1) return false;
    return true;
}
