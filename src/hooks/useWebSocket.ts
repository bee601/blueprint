import { useCallback, useEffect, useRef, useState } from 'react';

export interface WebSocketMessage<T = unknown> {
    type: string;
    data: T;
}

export interface UseWebSocketOptions {
    url: string;
    protocols?: string[];
    reconnect?: boolean;
    heartbeatMs?: number;
    onOpen?: (event: Event) => void;
    onClose?: (event: CloseEvent) => void;
    onError?: (event: Event) => void;
    onMessage?: (message: WebSocketMessage) => void;
}

export function useWebSocket<T = unknown>(options: UseWebSocketOptions) {
    const [connected, setConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState<WebSocketMessage<T> | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const heartbeatRef = useRef<number | null>(null);
    const reconnectRef = useRef<number | null>(null);
    const attemptRef = useRef(0);
    const optionsRef = useRef(options);
    optionsRef.current = options;

    const connect = useCallback(() => {
        if (typeof window === 'undefined') return;
        if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
            return;
        }
        const ws = new WebSocket(optionsRef.current.url, optionsRef.current.protocols);
        wsRef.current = ws;
        ws.addEventListener('open', (event) => {
            setConnected(true);
            attemptRef.current = 0;
            optionsRef.current.onOpen?.(event);
            if (optionsRef.current.heartbeatMs) {
                heartbeatRef.current = window.setInterval(() => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ type: 'heartbeat', data: null }));
                    }
                }, optionsRef.current.heartbeatMs);
            }
        });
        ws.addEventListener('message', (event) => {
            try {
                const parsed = JSON.parse(event.data) as WebSocketMessage<T>;
                setLastMessage(parsed);
                optionsRef.current.onMessage?.(parsed as WebSocketMessage);
            } catch {
                const fallback: WebSocketMessage = { type: 'raw', data: event.data };
                setLastMessage(fallback as WebSocketMessage<T>);
                optionsRef.current.onMessage?.(fallback);
            }
        });
        ws.addEventListener('error', (event) => optionsRef.current.onError?.(event));
        ws.addEventListener('close', (event) => {
            setConnected(false);
            optionsRef.current.onClose?.(event);
            if (heartbeatRef.current) {
                window.clearInterval(heartbeatRef.current);
                heartbeatRef.current = null;
            }
            if (optionsRef.current.reconnect !== false) {
                attemptRef.current += 1;
                const delay = Math.min(30000, 1000 * 2 ** attemptRef.current);
                reconnectRef.current = window.setTimeout(connect, delay);
            }
        });
    }, []);

    useEffect(() => {
        connect();
        return () => {
            if (reconnectRef.current) window.clearTimeout(reconnectRef.current);
            if (heartbeatRef.current) window.clearInterval(heartbeatRef.current);
            wsRef.current?.close();
        };
    }, [connect]);

    const send = useCallback((message: unknown) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(typeof message === 'string' ? message : JSON.stringify(message));
            return true;
        }
        return false;
    }, []);

    return { connected, lastMessage, send, socket: wsRef.current };
}
