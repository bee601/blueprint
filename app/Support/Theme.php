<?php

namespace Blueprint\Support;

use Blueprint\Settings\SettingsEngine;

class Theme
{
    public function __construct(protected SettingsEngine $settings) {}

    public function primary(): string
    {
        return $this->cssVar('primary') ?? '108 92 231';
    }

    public function accent(): string
    {
        return $this->cssVar('accent') ?? '139 92 246';
    }

    public function radius(): string
    {
        return (string) config('blueprint.radius', '16px');
    }

    protected function cssVar(string $key): ?string
    {
        $resolved = $this->settings->resolved();
        return $resolved['tokens'][$key] ?? null;
    }
}
