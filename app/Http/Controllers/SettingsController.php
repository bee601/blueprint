<?php

declare(strict_types=1);

namespace Blueprint\Theme\Http\Controllers;

use Blueprint\Theme\Settings\ManifestExporter;
use Blueprint\Theme\Settings\SettingsEngine;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class SettingsController extends Controller
{
    public function __construct(
        private readonly SettingsEngine $engine,
        private readonly ManifestExporter $exporter,
    ) {
    }

    /**
     * Returns the public manifest of categories & presets. Cacheable for 1h.
     */
    public function manifest(): JsonResponse
    {
        return response()->json([
            'version' => $this->engine->manifest()['version'],
            'categories' => $this->engine->manifest()['categories'],
            'presets' => $this->engine->presets(),
            'defaults' => $this->engine->defaults(),
        ])->header('Cache-Control', 'public, max-age=3600');
    }

    /**
     * Returns the resolved values (defaults + overrides + active preset).
     */
    public function resolved(): JsonResponse
    {
        return response()->json([
            'values' => $this->engine->resolved(),
            'version' => $this->engine->manifest()['version'],
        ]);
    }

    /**
     * Persist a batch of setting values.
     */
    public function update(Request $request): JsonResponse
    {
        $values = $request->validate([
            '*' => ['nullable'],
        ]);

        $clean = [];
        foreach ($values as $key => $value) {
            $clean[$key] = is_string($value) ? trim($value) : $value;
        }

        $this->engine->update($clean);

        return response()->json([
            'ok' => true,
            'resolved' => $this->engine->resolved(),
        ]);
    }

    /**
     * Reset a category (or all) to defaults.
     */
    public function reset(Request $request): JsonResponse
    {
        $this->engine->reset($request->input('category'));

        return response()->json([
            'ok' => true,
            'resolved' => $this->engine->resolved(),
        ]);
    }
}
