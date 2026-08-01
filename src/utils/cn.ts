import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind class names intelligently.
 * Used throughout the component library so that prop-based classes
 * override defaults without conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
