import { z } from 'zod';

/**
 * Settings schema — describes the shape of every configurable option
 * Blueprint exposes. The Laravel SettingsEngine mirrors this on the server.
 */
export const SettingSchema = z.object({
    key: z.string(),
    category: z.string(),
    label: z.string(),
    description: z.string().optional(),
    type: z.enum([
        'boolean',
        'string',
        'text',
        'number',
        'range',
        'select',
        'multi-select',
        'color',
        'toggle-group',
        'json',
        'css',
        'js',
        'html',
    ]),
    default: z.unknown(),
    options: z
        .array(
            z.object({
                value: z.string(),
                label: z.string(),
                description: z.string().optional(),
            }),
        )
        .optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    step: z.number().optional(),
    dependsOn: z.string().optional(),
    visible: z.boolean().default(true),
    advanced: z.boolean().default(false),
    experimental: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
});

export const CategorySchema = z.object({
    id: z.string(),
    label: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().default(0),
    groups: z.array(
        z.object({
            id: z.string(),
            label: z.string(),
            description: z.string().optional(),
            settings: z.array(SettingSchema),
        }),
    ),
});

export const SettingsManifestSchema = z.object({
    version: z.string(),
    categories: z.array(CategorySchema),
});

export type SettingDef = z.infer<typeof SettingSchema>;
export type CategoryDef = z.infer<typeof CategorySchema>;
export type SettingsManifest = z.infer<typeof SettingsManifestSchema>;
