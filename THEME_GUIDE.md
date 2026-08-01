# Theme guide

A tour of how Blueprint is built so you can extend it confidently.

## The single source of truth

`theme/tokens/default.json` is the canonical manifest. It describes:

- Every **setting** (key, label, type, default, options, dependsOn, advanced, experimental, tags)
- The **categories** those settings belong to
- **Validation rules** the React UI and the Laravel backend both enforce

The Laravel `SettingsEngine` reads this file directly. The React app fetches the manifest from `/api/blueprint/manifest` (rendered as JSON inside a `<script id="blueprint-manifest">` block by the `@blueprintManifest` directive).

## CSS variable system

Every color, radius, blur and shadow is exposed as a CSS variable:

```css
:root {
  --primary: 108 92 231;
  --accent: 139 92 246;
  --background: 11 15 25;
  --radius: 16px;
  --blur: 16px;
  --gradient: linear-gradient(135deg, var(--primary), var(--accent));
}
```

The values are stored as **space-separated RGB** triples so Tailwind can compose alpha utilities:

```css
.bg-primary\/10 { background-color: rgb(var(--primary) / 0.1); }
```

## The CssResolver

`Blueprint\Settings\CssResolver` walks the active preset + stored overrides and emits a single `<style>` block at the top of every page. The Laravel view composer `@blueprintCss` calls `CssResolver::inlineStyle()` and renders the result inside `<head>`.

## React ↔ Laravel parity

Both sides have parallel implementations:

| Concern | Laravel | React |
| --- | --- | --- |
| Manifest | `Settings\SettingsEngine::manifest()` | `src/config/settings.manifest.ts` |
| Persistence | `storage/app/blueprint/settings.json` | `localStorage.blueprint.settings` |
| Defaults | `SettingsEngine::defaults()` | `useSettings()` |
| Override merge | `SettingsEngine::resolved()` | `useSettings()` |
| CSS variables | `@blueprintCss` directive | `applyCssVars()` in `useSettings` |

Whenever you add a setting you only need to update `theme/tokens/default.json` — both sides pick it up automatically.

## Adding a new page

1. Create a Blade view under `resources/views/servers/view/<name>.blade.php`.
2. Extend `blueprint::layouts.app` (user pages) or `blueprint::admin.layouts.app` (admin pages).
3. Reuse the components in `resources/views/components/` (stat-card, server-card, empty-state, button, icon, setting-field).
4. Add a route in Pterodactyl's `routes/web.php` that points to your view.

## Adding a new React component

1. Drop the component in `src/components/<area>/<Name>.tsx`.
2. Import the design tokens from CSS variables (`bg-card/60`, `text-foreground`, etc.).
3. Use `@/utils/cn` for class merging.
4. Export from the area's `index.ts`.

That's it — Vite will pick it up automatically.
