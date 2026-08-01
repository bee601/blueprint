import { useEffect, useState } from 'react';

export function useCopyToClipboard(): { copied: boolean; copy: (text: string) => Promise<boolean> } {
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        if (!copied) return;
        const id = window.setTimeout(() => setCopied(false), 1500);
        return () => window.clearTimeout(id);
    }, [copied]);
    return {
        copied,
        copy: async (text: string) => {
            try {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                return true;
            } catch {
                return false;
            }
        },
    };
}
