import { useEffect, useState } from 'react';

export interface ConsoleLine {
    text: string;
    level?: 'system' | 'info' | 'warn' | 'error' | 'success' | 'muted';
    timestamp?: number;
}

/**
 * Demo / mock data feed for the terminal — used in marketing screenshots,
 * in Storybook stories, and when the real websocket is disconnected.
 *
 * Generates realistic-looking Minecraft server output.
 */
const MESSAGES: Array<{ text: string; level: ConsoleLine['level'] }> = [
    { text: '[Server] Starting minecraft server version 1.21.1', level: 'system' },
    { text: '[Server] Loading properties', level: 'muted' },
    { text: '[Server] Default game type: SURVIVAL', level: 'info' },
    { text: '[Server] Generating keypair', level: 'muted' },
    { text: '[Server] Starting Minecraft server on *:25565', level: 'system' },
    { text: '[Server] Using epoll channel type', level: 'muted' },
    { text: '[Server] Preparing level "world"', level: 'info' },
    { text: '[Server] Preparing spawn area: 0%', level: 'info' },
    { text: '[Server] Preparing spawn area: 50%', level: 'info' },
    { text: '[Server] Preparing spawn area: 100%', level: 'info' },
    { text: '[Server] Time elapsed: 1426 ms', level: 'success' },
    { text: '[Server] Done (3.452s)! For help, type "help"', level: 'success' },
    { text: '[INFO] Player Notch[/91.218.50.10:55112] joined the game', level: 'info' },
    { text: '[INFO] Player Steve[/45.84.89.11:49301] joined the game', level: 'info' },
    { text: "[WARN] Can't keep up! Is the server overloaded? Running 2210ms behind", level: 'warn' },
    { text: '[INFO] Notch has reached the achievement [Diamonds!]', level: 'success' },
    { text: '[INFO] Steve issued server command: /sethome', level: 'info' },
    { text: '[INFO] Saving chunks for level \'ServerLevel[world]\'/minecraft:overworld', level: 'muted' },
];

export function useMockConsole(enabled = true, intervalMs = 1100): ConsoleLine[] {
    const [lines, setLines] = useState<ConsoleLine[]>([]);

    useEffect(() => {
        if (!enabled) return;
        let i = 0;
        const interval = window.setInterval(() => {
            const next = MESSAGES[i % MESSAGES.length];
            i++;
            setLines((prev) => {
                const newLines = [...prev, { ...next, timestamp: Date.now() }];
                return newLines.slice(-300);
            });
        }, intervalMs);
        return () => window.clearInterval(interval);
    }, [enabled, intervalMs]);

    return lines;
}
