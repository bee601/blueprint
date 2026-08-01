<?php

declare(strict_types=1);

namespace Blueprint\Theme\Settings;

/**
 * Compute the final CSS-variable string for the active theme.
 *
 * Walks defaults -> preset tokens -> user overrides and returns a
 * ready-to-emit ":root { ... }" stylesheet. Run by BlueprintServiceProvider
 * on every page so the theme is always in sync with the user's last
 * selection.
 */
class CssResolver
{
    public function __construct(private readonly SettingsEngine $settings)
    {
    }

    /**
     * Render a complete CSS string using the current settings.
     */
    public function toCss(): string
    {
        $resolved = $this->settings->resolved();
        $preset = $this->settings->preset();
        $radius = (int) ($resolved['appearance.radius'] ?? ($preset['radius'] ?? 16));
        $glass = (bool) ($resolved['appearance.glass'] ?? ($preset['glass'] ?? true));
        $blur = (int) ($resolved['appearance.blur'] ?? ($preset['blur'] ?? 12));

        $tokens = array_merge(
            $preset['tokens'] ?? [],
            $this->resolveUserTokens($resolved),
        );

        $lines = [':root, [data-theme="' . ($preset['name'] ?? 'blueprint-dark') . '"] {'];
        foreach ($tokens as $name => $value) {
            if (!is_string($value) || $value === '') {
                continue;
            }
            $rgb = $this->hexToRgb($value);
            if ($rgb !== null) {
                $lines[] = sprintf('  --%s: %d %d %d;', $name, $rgb[0], $rgb[1], $rgb[2]);
            } else {
                $lines[] = sprintf('  --%s: %s;', $name, $value);
            }
        }
        $lines[] = sprintf('  --radius: %dpx;', $radius);
        $lines[] = sprintf('  --glass-blur: %dpx;', $glass ? $blur : 0);
        $lines[] = sprintf('  --glass-opacity: %s;', $glass ? '0.65' : '1');
        $lines[] = '}';

        return implode("\n", $lines);
    }

    /**
     * Apply resolved tokens as CSS variables to a fragment of HTML.
     */
    public function inlineStyle(): string
    {
        return '<style id="blueprint-theme">' . $this->toCss() . '</style>';
    }

    /**
     * @param array<string, mixed> $resolved
     * @return array<string, string>
     */
    protected function resolveUserTokens(array $resolved): array
    {
        $tokens = [];
        $accent = $resolved['appearance.accent'] ?? null;
        if ($accent === 'custom' && isset($resolved['appearance.accentCustom'])) {
            $tokens['primary'] = (string) $resolved['appearance.accentCustom'];
            $tokens['accent'] = (string) $resolved['appearance.accentCustom'];
        }
        return $tokens;
    }

    /**
     * @return array{0:int,1:int,2:int}|null
     */
    protected function hexToRgb(string $hex): ?array
    {
        $hex = ltrim($hex, '#');
        if (strlen($hex) === 3) {
            $hex = preg_replace('/./', '$0$0', $hex) ?? $hex;
        }
        if (!preg_match('/^[0-9a-fA-F]{6}$/', $hex)) {
            return null;
        }
        $value = hexdec($hex);
        return [
            ($value >> 16) & 255,
            ($value >> 8) & 255,
            $value & 255,
        ];
    }
}
