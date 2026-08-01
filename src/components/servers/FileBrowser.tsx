import { ChevronRight, Folder, File, MoreHorizontal, Upload, FolderPlus, Trash2, Edit, Move, Copy, Download, Eye } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@utils/cn';
import { formatBytes, timeAgo } from '@utils/format';
import type { FileEntry } from '@/types';
import { Button } from '@components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@components/ui/DropdownMenu';
import { Checkbox } from '@components/ui/Checkbox';
import { Skeleton } from '@components/ui/Skeleton';

export interface FileBrowserProps {
    entries: FileEntry[];
    onNavigate?: (entry: FileEntry) => void;
    onAction?: (action: FileAction, entry: FileEntry) => void;
    loading?: boolean;
    className?: string;
    selected?: string[];
    onSelectionChange?: (next: string[]) => void;
}

export type FileAction = 'open' | 'rename' | 'move' | 'copy' | 'delete' | 'download' | 'preview';

export function FileBrowser({ entries, onNavigate, onAction, loading, className, selected = [], onSelectionChange }: FileBrowserProps) {
    const all = entries.length;
    const selectedAll = selected.length > 0 && selected.length === all;
    const someSelected = selected.length > 0 && !selectedAll;

    const toggleAll = () => {
        onSelectionChange?.(selectedAll ? [] : entries.map((e) => e.name));
    };

    const toggleOne = (name: string) => {
        onSelectionChange?.(
            selected.includes(name) ? selected.filter((n) => n !== name) : [...selected, name],
        );
    };

    return (
        <div className={cn('overflow-hidden rounded-2xl border border-border bg-card shadow-card', className)}>
            <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
                <Checkbox checked={selectedAll} onCheckedChange={toggleAll} aria-label="Select all" indeterminate={someSelected} />
                <span className="ml-2 flex-1 font-medium">Name</span>
                <span className="hidden w-24 text-right sm:inline">Size</span>
                <span className="hidden w-36 text-right sm:inline">Modified</span>
                <span className="w-8" />
            </div>
            {loading ? (
                <div className="divide-y divide-border/60">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2 px-4 py-2">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 flex-1" />
                            <Skeleton className="hidden h-4 w-16 sm:block" />
                        </div>
                    ))}
                </div>
            ) : entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 p-12 text-center text-sm text-muted-foreground">
                    <Folder className="h-8 w-8" />
                    <p>This directory is empty</p>
                    <Button size="sm" variant="secondary" leftIcon={<Upload className="h-4 w-4" />}>
                        Upload files
                    </Button>
                </div>
            ) : (
                <ul className="divide-y divide-border/60">
                    {entries.map((entry) => {
                        const isSelected = selected.includes(entry.name);
                        return (
                            <li
                                key={entry.name}
                                className={cn(
                                    'group flex items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-muted/40',
                                    isSelected && 'bg-primary/5',
                                )}
                            >
                                <Checkbox checked={isSelected} onCheckedChange={() => toggleOne(entry.name)} aria-label={`Select ${entry.name}`} />
                                <button
                                    className="flex flex-1 items-center gap-2 truncate text-left"
                                    onClick={() => onNavigate?.(entry)}
                                >
                                    {entry.is_directory ? (
                                        <Folder className="h-4 w-4 flex-none text-primary" />
                                    ) : (
                                        <File className="h-4 w-4 flex-none text-muted-foreground" />
                                    )}
                                    <span className="truncate font-medium">{entry.name}</span>
                                    {entry.is_symlink && <span className="text-[10px] text-muted-foreground">↗</span>}
                                </button>
                                <span className="hidden w-24 text-right font-mono text-xs text-muted-foreground sm:inline">
                                    {entry.is_directory ? '—' : formatBytes(entry.size)}
                                </span>
                                <span className="hidden w-36 text-right text-xs text-muted-foreground sm:inline">
                                    {timeAgo(entry.modified_at)}
                                </span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon-sm" className="opacity-0 transition-opacity group-hover:opacity-100">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => onAction?.('open', entry)}>
                                            <Eye className="h-4 w-4" /> View
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onAction?.('rename', entry)}>
                                            <Edit className="h-4 w-4" /> Rename
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onAction?.('move', entry)}>
                                            <Move className="h-4 w-4" /> Move
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onAction?.('copy', entry)}>
                                            <Copy className="h-4 w-4" /> Copy
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onAction?.('download', entry)}>
                                            <Download className="h-4 w-4" /> Download
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem destructive onClick={() => onAction?.('delete', entry)}>
                                            <Trash2 className="h-4 w-4" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export function FileBreadcrumb({ path, onNavigate }: { path: string[]; onNavigate: (idx: number) => void }) {
    return (
        <div className="flex flex-wrap items-center gap-1 text-sm">
            <button onClick={() => onNavigate(-1)} className="rounded-md px-1.5 py-0.5 font-mono text-muted-foreground hover:bg-secondary/60 hover:text-foreground">
                /
            </button>
            {path.map((segment, idx) => (
                <span key={idx} className="flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                    <button
                        onClick={() => onNavigate(idx)}
                        className="rounded-md px-1.5 py-0.5 font-mono text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                    >
                        {segment}
                    </button>
                </span>
            ))}
        </div>
    );
}

export function FileToolbar({ onCreateFolder, onUpload, onDelete, hasSelection }: { onCreateFolder?: () => void; onUpload?: () => void; onDelete?: () => void; hasSelection?: boolean }) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="secondary" leftIcon={<FolderPlus className="h-4 w-4" />} onClick={onCreateFolder}>
                New folder
            </Button>
            <Button size="sm" variant="primary" leftIcon={<Upload className="h-4 w-4" />} onClick={onUpload}>
                Upload
            </Button>
            {hasSelection && (
                <Button size="sm" variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />} onClick={onDelete}>
                    Delete
                </Button>
            )}
        </div>
    );
}
