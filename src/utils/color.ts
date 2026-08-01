/**
 * Convert any hex color to the space-separated "r g b" string expected by
 * the CSS-variable design system. Supports 3, 6, and 8-digit hex.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    if (typeof hex !== 'string') return null;
    const cleaned = hex.replace('#', '').trim();
    const full = cleaned.length === 3
        ? cleaned.split('').map((c) => c + c).join('')
        : cleaned.length === 8
            ? cleaned.slice(0, 6)
            : cleaned;
    if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
    const n = parseInt(full, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function hexToRgbString(hex: string): string | null {
    const rgb = hexToRgb(hex);
    return rgb ? `${rgb.r} ${rgb.g} ${rgb.b}` : null;
}

/**
 * Quick relative luminance — used by getContrastColor.
 */
export function luminance(hex: string): number {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((v) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastColor(hex: string): 'light' | 'dark' {
    return luminance(hex) > 0.5 ? 'dark' : 'light';
}

/**
 * Mix two colors in linear-RGB space by a weight in [0, 1].
 */
export function mixHex(a: string, b: string, weight = 0.5): string {
    const ca = hexToRgb(a);
    const cb = hexToRgb(b);
    if (!ca || !cb) return a;
    const w = Math.max(0, Math.min(1, weight));
    const r = Math.round(ca.r * w + cb.r * (1 - w));
    const g = Math.round(ca.g * w + cb.g * (1 - w));
    const b2 = Math.round(ca.b * w + cb.b * (1 - w));
    return `#${[r, g, b2].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}
