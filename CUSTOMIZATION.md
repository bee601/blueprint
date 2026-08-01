# Customization

Blueprint is built to be customized without touching the core. The two main extension points are **presets** and **settings overrides**, both driven entirely by JSON.

## Adding a preset

1. Create `theme/presets/my-preset.json`:

   ```json
   {
     "name": "my-preset",
     "label": "My custom preset",
     "version": "1.0.0",
     "description": "A pastel palette inspired by sunrise.",
     "mode": "light",
     "tokens": {
       "primary": "255 138 101",
       "accent": "255 209 102",
       "background": "255 248 240",
       "card": "255 255 255"
     }
   }
   ```

2. Run `php artisan blueprint:publish-assets` (the manifest is regenerated automatically).

3. Select the preset from the admin **Theme** page or via `config/blueprint.php`.

## Adjusting a setting

Override any setting in `storage/app/blueprint/settings.json`:

```json
{
  "appearance.sidebar.collapsed": true,
  "animations.durations.base": "120ms"
}
```

The settings engine deep-merges these values on top of the active preset and rebuilds CSS variables on the next request.

## Custom CSS / JS / HTML

Open the admin **Settings → Advanced** panel to inject arbitrary code:

- **Custom CSS** is appended inside the `<style id="blueprint-overrides">` block.
- **Custom JS** runs in a sandboxed `DOMContentLoaded` listener.
- **Custom HTML** is rendered inside the navbar dropdown.

## Adding a new setting category

1. Add the category to `theme/tokens/default.json`:

   ```json
   {
     "name": "performance",
     "label": "Performance",
     "settings": [
       {
         "key": "performance.virtual_list",
         "label": "Virtualize long lists",
         "type": "boolean",
         "default": true
       }
     ]
   }
   ```

2. Re-run `php artisan blueprint:publish-assets`.

The new setting appears in the admin **Settings** page automatically and is wired through both the Laravel and React layers.

## Theming the React side

- All design tokens are CSS variables defined in `resources/css/app.css`.
- Tailwind's color palette is wired to those variables (`tailwind.config.js`).
- React components consume the same variables via `var(--token)` for hardcoded styles.
- For runtime switching, use the `useSettings()` hook (`src/hooks/useSettings.ts`).
