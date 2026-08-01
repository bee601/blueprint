# Building Blueprint

Blueprint ships as a single repo that builds both the Laravel side and the React side.

## What gets built

| Target | Path | Notes |
| --- | --- | --- |
| CSS bundle | `dist/css/app.css` | Tailwind, theme variables, layout & components |
| JS bundle | `dist/js/app.js` | React component library, command palette, toaster |
| Vite manifest | `dist/manifest.json` | Consumed by `@blueprintManifest` directive |
| PHP autoload | `vendor/autoload.php` | Standard Composer |

## Local development

```bash
npm run dev      # watch & rebuild
npm run build    # production build
npm run typecheck
npm run lint
npm run test
```

## Cross-platform installers

```bash
# POSIX
./scripts/install.sh

# Windows
scripts\install.bat
```

Both installers install Composer + npm dependencies, run the Vite build, and publish assets into your panel.

## CI

`.github/workflows/build.yml` runs on every push:

1. `composer install --prefer-dist`
2. `npm ci`
3. `npm run build`
4. Uploads `dist/` as a build artifact.

## Troubleshooting

- **Vite complains about missing `@vitejs/plugin-react`** — ensure you're on Node 20+ and have run `npm install`.
- **Tailwind doesn't include your custom class** — run `npm run build` to regenerate the JIT cache.
- **Laravel can't find `Blueprint\Settings\SettingsEngine`** — run `composer dump-autoload`.
