/**
 * Lightweight validation helpers used by the settings engine and forms.
 * Each returns a string error message or null on success.
 */
export const validators = {
    required(value: unknown): string | null {
        if (value === null || value === undefined) return 'Required';
        if (typeof value === 'string' && value.trim() === '') return 'Required';
        if (Array.isArray(value) && value.length === 0) return 'Required';
        return null;
    },
    email(value: unknown): string | null {
        if (typeof value !== 'string' || value.length === 0) return null;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email address';
    },
    minLength(min: number) {
        return (value: unknown): string | null => {
            if (typeof value !== 'string') return 'Must be a string';
            return value.length >= min ? null : `Must be at least ${min} characters`;
        };
    },
    maxLength(max: number) {
        return (value: unknown): string | null => {
            if (typeof value !== 'string') return 'Must be a string';
            return value.length <= max ? null : `Must be at most ${max} characters`;
        };
    },
    pattern(re: RegExp, message = 'Invalid format') {
        return (value: unknown): string | null => {
            if (typeof value !== 'string' || value.length === 0) return null;
            return re.test(value) ? null : message;
        };
    },
    range(min: number, max: number) {
        return (value: unknown): string | null => {
            const n = Number(value);
            if (!Number.isFinite(n)) return 'Must be a number';
            return n >= min && n <= max ? null : `Must be between ${min} and ${max}`;
        };
    },
    url(value: unknown): string | null {
        if (typeof value !== 'string' || value.length === 0) return null;
        try {
            new URL(value);
            return null;
        } catch {
            return 'Invalid URL';
        }
    },
};
