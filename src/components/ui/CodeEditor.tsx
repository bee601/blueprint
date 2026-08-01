import { cn } from '@utils/cn';
import { forwardRef, type TextareaHTMLAttributes } from 'react';

export interface CodeEditorProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    language?: 'css' | 'js' | 'html' | 'json' | 'plain';
    lineNumbers?: boolean;
}

export const CodeEditor = forwardRef<HTMLTextAreaElement, CodeEditorProps>(function CodeEditor(
    { className, language = 'plain', lineNumbers = true, value, ...rest },
    ref,
) {
    return (
        <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-card">
            <div className="flex items-center justify-between border-b border-border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">
                <span className="font-mono uppercase tracking-wider">{language}</span>
                <div className="flex gap-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
                </div>
            </div>
            <div className="relative grid grid-cols-[3rem,1fr] font-mono text-xs">
                {lineNumbers && (
                    <div className="select-none border-r border-border bg-muted/20 px-2 py-3 text-right text-muted-foreground/60">
                        {String(value ?? '').split('\n').map((_, i) => (
                            <div key={i}>{i + 1}</div>
                        ))}
                    </div>
                )}
                <textarea
                    ref={ref}
                    spellCheck={false}
                    value={value}
                    className={cn(
                        'min-h-[200px] resize-y border-none bg-transparent p-3 font-mono text-sm text-foreground focus:outline-none focus:ring-0',
                        className,
                    )}
                    {...rest}
                />
            </div>
        </div>
    );
});
