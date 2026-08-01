import { useEffect, useState } from 'react';
import { ptero } from '@utils/ptero';
import { useAsync } from './useAsync';
import type { ServerStat, FileEntry, ActivityLog, Schedule, Database, Backup, Node } from '@/types';

export function usePteroAPI() {
    return {
        listServers: useAsync(() => ptero().get<unknown>('/api/client').then((r) => r.data)),
        listNodes: useAsync(() => ptero().get<Node[]>('/api/application/nodes').then((r) => r.data)),
        listActivity: useAsync(() => ptero().get<ActivityLog[]>('/api/client/activity').then((r) => r.data)),
        listSchedules: useAsync(() => ptero().get<Schedule[]>('/api/client/servers').then((r) => r.data)),
        listBackups: useAsync(() => ptero().get<Backup[]>('/api/client/servers').then((r) => r.data)),
        listDatabases: useAsync(() => ptero().get<Database[]>('/api/client/servers').then((r) => r.data)),
        listFiles: useAsync(() => ptero().get<FileEntry[]>('/api/client/servers').then((r) => r.data)),
        listStats: useAsync(() => ptero().get<ServerStat>('/api/client/servers').then((r) => r.data)),
    };
}

export function usePolledValue<T>(fn: () => Promise<T>, intervalMs = 30000, deps: unknown[] = []) {
    const [value, setValue] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        let cancelled = false;
        const tick = async () => {
            try {
                const result = await fn();
                if (!cancelled) {
                    setValue(result);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err : new Error(String(err)));
                }
            }
        };
        void tick();
        const id = window.setInterval(tick, intervalMs);
        return () => {
            cancelled = true;
            window.clearInterval(id);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    return { value, error };
}
