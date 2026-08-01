<?php

declare(strict_types=1);

namespace Blueprint\Theme\Settings;

/**
 * Convert the manifest into JSON consumable by the React UI on boot.
 *
 * Triggered by BlueprintServiceProvider and cached in storage/framework/cache
 * so the API endpoint /api/blueprint/settings is essentially zero-cost.
 */
class ManifestExporter
{
    public function __construct(private readonly SettingsEngine $engine)
    {
    }

    public function toJson(): string
    {
        return json_encode([
            'version' => $this->engine->manifest()['version'],
            'categories' => $this->engine->manifest()['categories'],
            'presets' => $this->engine->presets(),
            'defaults' => $this->engine->defaults(),
            'resolved' => $this->engine->resolved(),
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    }
}
