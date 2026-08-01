import { useCallback, useEffect, useState } from 'react';
import { hexToRgbString } from '@utils/color';
import { deepMerge } from '@utils/deep-merge';
import { useLocalStorage } from './useLocalStorage';
import { settingsManifest } from '@config/settings.manifest';
import type { SettingsManifest, SettingDef } from '@config/settings.schema';
import type { ThemeMode } from '@/types';

const STORAGE_KEY = 'blueprint.settings.v1';

export interface SettingsState {
    values: Record<string, unknown>;
    category: string;
    set: <T = unknown>(key: string, value: T) => void;
    reset: (category?: string) => void;
    apply: () => void;
    ready: boolean;
    getDefinition: (key: string) => SettingDef | undefined;
    list: (category?: string) => SettingDef[];
}

export function useSettings(): SettingsState {
    const manifest: SettingsManifest = settingsManifest;
    const defaults = collectDefaults(manifest);
    const [stored, setStored] = useLocalStorage<Record<string, unknown>>(STORAGE_KEY, defaults);
    const [values, setValues] = useState<Record<string, unknown>>(deepMerge(defaults, stored));
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    const apply = useCallback(() => {
        if (typeof document === 'undefined') return;
        const root = document.documentElement;
        const theme = pickTheme(values['appearance.theme'] as string);
        root.setAttribute('data-theme', (values['appearance.mode'] as ThemeMode) ?? 'dark');
        root.setAttribute('data-theme-preset', theme);
        const radius = Number(values['appearance.radius'] ?? 16);
        root.style.setProperty('--radius', `${radius}px`);
        if (values['appearance.glass']) {
            root.style.setProperty('--glass-blur', `${Number(values['appearance.blur'] ?? 12)}px`);
        } else {
            root.style.setProperty('--glass-blur', `0px`);
            root.style.setProperty('--glass-opacity', '1');
        }
        const accent = (values['appearance.accent'] as string) ?? 'violet';
        if (accent === 'custom' && typeof values['appearance.accentCustom'] === 'string') {
            const rgb = hexToRgbString(values['appearance.accentCustom'] as string);
            if (rgb) {
                root.style.setProperty('--primary', rgb);
            }
        } else {
            const preset = ACCENT_PRESETS[accent];
            if (preset) {
                root.style.setProperty('--primary', preset.primary);
                root.style.setProperty('--accent', preset.accent);
            }
        }
        root.dataset.animations = String(values['appearance.animations'] ?? 'full');
        root.dataset.density = String(values['appearance.density'] ?? 'comfortable');
        if (values['a11y.reducedMotion']) root.dataset.reducedMotion = 'true';
        else root.dataset.reducedMotion = 'false';
    }, [values]);

    useEffect(() => {
        apply();
    }, [apply]);

    const set = useCallback(
        <T,>(key: string, value: T) => {
            setValues((prev) => {
                const next = { ...prev, [key]: value };
                setStored(next);
                return next;
            });
        },
        [setStored],
    );

    const reset = useCallback(
        (category?: string) => {
            setValues((prev) => {
                const next = { ...prev };
                for (const def of manifest.categories.flatMap((c) => c.groups).flatMap((g) => g.settings)) {
                    if (category && def.category !== category) continue;
                    next[def.key] = def.default;
                }
                setStored(next);
                return next;
            });
        },
        [manifest, setStored],
    );

    const getDefinition = useCallback(
        (key: string) => manifest.categories.flatMap((c) => c.groups).flatMap((g) => g.settings).find((s) => s.key === key),
        [manifest],
    );

    const list = useCallback(
        (category?: string) => {
            const all = manifest.categories.flatMap((c) => c.groups).flatMap((g) => g.settings);
            return category ? all.filter((s) => s.category === category) : all;
        },
        [manifest],
    );

    return { values, category: '', set, reset, apply, ready, getDefinition, list };
}

function collectDefaults(manifest: SettingsManifest): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    for (const def of manifest.categories.flatMap((c) => c.groups).flatMap((g) => g.settings)) {
        out[def.key] = def.default;
    }
    return out;
}

function pickTheme(value: string | undefined): string {
    return value ?? 'blueprint-dark';
}

const ACCENT_PRESETS: Record<string, { primary: string; accent: string }> = {
    violet: { primary: '108 92 231', accent: '139 92 246' },
    blue: { primary: '59 130 246', accent: '14 165 233' },
    cyan: { primary: '6 182 212', accent: '20 184 166' },
    emerald: { primary: '16 185 129', accent: '52 211 153' },
    rose: { primary: '244 63 94', accent: '251 113 133' },
    amber: { primary: '245 158 11', accent: '251 191 36' },
};
