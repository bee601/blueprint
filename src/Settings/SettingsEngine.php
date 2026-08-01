<?php

declare(strict_types=1);

namespace Blueprint\Theme\Settings;

use Illuminate\Contracts\Container\Container;
use Illuminate\Support\Arr;

/**
 * Modular settings engine for Blueprint.
 *
 * Settings are described by JSON "preset" files stored in /theme/presets and
 * applied on top of the default manifest. Per-user overrides are persisted to
 * storage/app/blueprint/settings.json via the cache repository.
 *
 * Adding a new setting is a matter of dropping a JSON file into
 * /theme/presets/<name>.json — the engine picks it up automatically.
 */
class SettingsEngine
{
    public function __construct(
        private readonly Container $container,
        private readonly string $manifestPath,
        private readonly string $presetsPath,
    ) {
    }

    /**
     * Load the manifest of all available settings, in display order.
     *
     * @return array<string, mixed>
     */
    public function manifest(): array
    {
        static $cache = null;
        if ($cache !== null) {
            return $cache;
        }

        $manifest = $this->readJson($this->manifestPath, ['version' => '0.0.0', 'categories' => []]);
        $categories = $manifest['categories'] ?? [];

        foreach ($categories as &$category) {
            $category['settings'] = $this->resolveSettings($category['settings'] ?? []);
        }

        $cache = [
            'version' => $manifest['version'] ?? '0.0.0',
            'categories' => $categories,
        ];

        return $cache;
    }

    /**
     * Resolve the value of a setting by walking default → preset → override.
     */
    public function get(string $key, mixed $default = null): mixed
    {
        $definition = $this->definition($key);
        $defaults = $this->defaults();
        $overrides = $this->overrides();
        $presetKey = $overrides['appearance.theme'] ?? 'blueprint-dark';
        $preset = $this->preset($presetKey);
        return Arr::get(
            array_replace_recursive($defaults, Arr::get($preset, 'tokens', []), Arr::get($overrides, 'values', [])),
            $key,
            $default ?? Arr::get($definition, 'default'),
        );
    }

    /**
     * Persist a setting value to user overrides.
     */
    public function set(string $key, mixed $value): void
    {
        $overrides = $this->overrides();
        Arr::set($overrides, 'values.' . $key, $value);
        $this->storeOverrides($overrides);
    }

    /**
     * Bulk update — pass an associative array of key/value pairs.
     */
    public function update(array $values): void
    {
        $overrides = $this->overrides();
        foreach ($values as $key => $value) {
            Arr::set($overrides, 'values.' . $key, $value);
        }
        $this->storeOverrides($overrides);
    }

    /**
     * Reset a single category, or the entire settings store.
     */
    public function reset(?string $category = null): void
    {
        if ($category === null) {
            $this->storeOverrides(['values' => [], 'version' => $this->manifest()['version']]);
            return;
        }
        $overrides = $this->overrides();
        foreach ($this->manifest()['categories'] as $cat) {
            if (($cat['id'] ?? null) !== $category) {
                continue;
            }
            foreach ($cat['settings'] ?? [] as $setting) {
                Arr::forget($overrides, 'values.' . $setting['key']);
            }
        }
        $this->storeOverrides($overrides);
    }

    /**
     * Look up a single setting's definition.
     *
     * @return array<string, mixed>|null
     */
    public function definition(string $key): ?array
    {
        foreach ($this->manifest()['categories'] as $category) {
            foreach ($category['settings'] ?? [] as $setting) {
                if ($setting['key'] === $key) {
                    return $setting;
                }
            }
        }
        return null;
    }

    /**
     * Resolve all settings with their resolved values (default + preset + override).
     *
     * @return array<string, mixed>
     */
    public function resolved(): array
    {
        $out = [];
        foreach ($this->manifest()['categories'] as $category) {
            foreach ($category['settings'] ?? [] as $setting) {
                $out[$setting['key']] = $this->get($setting['key']);
            }
        }
        return $out;
    }

    /**
     * Get all known theme presets (one JSON file per preset).
     *
     * @return array<int, array<string, mixed>>
     */
    public function presets(): array
    {
        $files = glob($this->presetsPath . '/*.json') ?: [];
        $presets = [];
        foreach ($files as $file) {
            $preset = $this->readJson($file, []);
            if (!is_array($preset) || empty($preset['name'])) {
                continue;
            }
            $presets[] = $preset;
        }
        usort($presets, fn (array $a, array $b): int => ($a['order'] ?? 0) <=> ($b['order'] ?? 0));
        return $presets;
    }

    /**
     * Load a single preset by name. Falls back to the default preset.
     */
    public function preset(?string $name = null): array
    {
        $name ??= (string) $this->get('appearance.theme');
        foreach ($this->presets() as $preset) {
            if (($preset['name'] ?? null) === $name) {
                return $preset;
            }
        }
        // Fall back to first preset or empty array.
        $presets = $this->presets();
        return $presets[0] ?? [];
    }

    /**
     * Aggregate the default value for every setting in the manifest.
     *
     * @return array<string, mixed>
     */
    public function defaults(): array
    {
        $out = [];
        foreach ($this->manifest()['categories'] as $category) {
            foreach ($category['settings'] ?? [] as $setting) {
                $out[$setting['key']] = $setting['default'] ?? null;
            }
        }
        return $out;
    }

    /**
     * @return array{values: array<string, mixed>, version: string}
     */
    public function overrides(): array
    {
        return $this->container['cache']->remember(
            'blueprint:settings:overrides',
            3600,
            fn () => $this->readJson($this->overridesPath(), ['values' => [], 'version' => '0.0.0']),
        );
    }

    /**
     * @param array{values: array<string, mixed>, version?: string} $overrides
     */
    protected function storeOverrides(array $overrides): void
    {
        $overrides['version'] = $overrides['version'] ?? ($this->manifest()['version'] ?? '0.0.0');
        $path = $this->overridesPath();
        if (!is_dir(dirname($path))) {
            mkdir(dirname($path), 0755, true);
        }
        file_put_contents($path, json_encode($overrides, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        $this->container['cache']->forget('blueprint:settings:overrides');
    }

    protected function overridesPath(): string
    {
        return storage_path('app/blueprint/settings.json');
    }

    /**
     * @param array<int, array<string, mixed>> $settings
     * @return array<int, array<string, mixed>>
     */
    protected function resolveSettings(array $settings): array
    {
        foreach ($settings as &$setting) {
            $setting['dependsOn'] = $setting['dependsOn'] ?? null;
            $setting['advanced'] = $setting['advanced'] ?? false;
            $setting['experimental'] = $setting['experimental'] ?? false;
            $setting['tags'] = $setting['tags'] ?? [];
        }
        return $settings;
    }

    /**
     * @return array<string, mixed>
     */
    protected function readJson(string $path, array $fallback): array
    {
        if (!is_file($path)) {
            return $fallback;
        }
        $contents = file_get_contents($path);
        if ($contents === false || $contents === '') {
            return $fallback;
        }
        $decoded = json_decode($contents, true);
        return is_array($decoded) ? $decoded : $fallback;
    }
}
