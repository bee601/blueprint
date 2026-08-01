import { cn } from '@utils/cn';
import type { HTMLAttributes } from 'react';

export function Skeleton({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('skeleton rounded-md', className)} {...rest} />;
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
    return (
        <div className={cn('space-y-2', className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className="h-3"
                    style={{ width: `${Math.max(40, 100 - i * 15)}%` }}
                />
            ))}
        </div>
    );
}

export function SkeletonCard() {
    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-3/4" />
                </div>
            </div>
            <div className="mt-6 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-2/3" />
            </div>
        </div>
    );
}
