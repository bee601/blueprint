import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@utils/cn';
import { Maximize2, Pause, Play, Trash2, Download, Terminal as TerminalIcon } from 'lucide-react';
import { Button } from '@components/ui/Button';
import { Badge } from '@components/ui/Badge';

export interface ConsoleLine {
    id?: string;
    text: string;
    level?: 'system' | 'info' | 'warn' | 'error' | 'success' | 'muted';
    timestamp?: number;
}

export interface TerminalProps {
    lines: ConsoleLine[];
    onSubmit?: (command: string) => void;
    status?: 'online' | 'offline' | 'connecting' | 'error';
    title?: string;
    className?: string;
    autoScroll?: boolean;
    onClear?: () => void;
    prompt?: string;
}

const COLOR_MAP: Record<NonNullable<ConsoleLine['level']>, string> = {
    system: 'text-accent',
    info: 'text-foreground',
    warn: 'text-warning',
    error: 'text-destructive',
    success: 'text-success',
    muted: 'text-muted-foreground',
};

export function Terminal({ lines, onSubmit, status = 'online', title, className, autoScroll = true, onClear, prompt = '$' }: TerminalProps) {
    const [paused, setPaused] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (autoScroll && !paused && ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [lines, autoScroll, paused]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const cmd = input.trim();
        if (!cmd) return;
        setHistory((h) => [...h, cmd].slice(-100));
        setHistoryIndex(null);
        onSubmit?.(cmd);
        setInput('');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (history.length === 0) return;
            const newIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(newIndex);
            setInput(history[newIndex] ?? '');
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (historyIndex === null) return;
            const newIndex = historyIndex + 1;
            if (newIndex >= history.length) {
                setHistoryIndex(null);
                setInput('');
                return;
            }
            setHistoryIndex(newIndex);
            setInput(history[newIndex] ?? '');
        } else if (event.key === 'l' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            onClear?.();
        }
    };

    const visible = paused ? lines.slice(-200) : lines;

    return (
        <div
            className={cn(
                'group/terminal relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-[#07090F] shadow-card',
                className,
            )}
        >
            <header className="flex items-center gap-2 border-b border-border bg-[#0B0F19] px-3 py-1.5 text-xs">
                <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-warning/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-muted-foreground">
                    <TerminalIcon className="h-3.5 w-3.5" />
                    <span className="font-semibold text-foreground">{title ?? 'console'}</span>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                    <Badge variant={status === 'online' ? 'success' : status === 'error' ? 'destructive' : 'secondary'} className="uppercase">
                        {status}
                    </Badge>
                    <Button size="icon-sm" variant="ghost" onClick={() => setPaused((p) => !p)} title={paused ? 'Resume' : 'Pause'}>
                        {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                    </Button>
                    <Button size="icon-sm" variant="ghost" onClick={onClear} title="Clear">
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="icon-sm" variant="ghost" title="Download log">
                        <Download className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="icon-sm" variant="ghost" title="Fullscreen">
                        <Maximize2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </header>
            <div
                ref={ref}
                className="console-output flex-1"
                aria-live="polite"
                onClick={(e) => {
                    if (e.currentTarget === e.target) {
                        const input = e.currentTarget.querySelector<HTMLInputElement>('.console-input');
                        input?.focus();
                    }
                }}
            >
                {visible.map((line, idx) => (
                    <span
                        key={line.id ?? idx}
                        className={cn('console-line', COLOR_MAP[line.level ?? 'info'])}
                    >
                        {line.text}
                    </span>
                ))}
                {paused && (
                    <div className="mt-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-warning" />
                        Stream paused
                    </div>
                )}
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 border-t border-border bg-[#0B0F19] px-3 py-2 font-mono text-sm"
            >
                <span className="select-none text-primary">{prompt}</span>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="console-input"
                    placeholder={onSubmit ? 'Type a command and press Enter…' : 'Console is read-only.'}
                    autoComplete="off"
                    spellCheck={false}
                    autoFocus
                />
            </form>
        </div>
    );
}
