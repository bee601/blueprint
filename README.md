# Blueprint

A premium replacement UI for the [Pterodactyl Panel](https://pterodactyl.io), inspired by Vercel, Linear, GitHub, Railway, Cloudflare and Stripe.

> Designed for production: every screen in Pterodactyl is redesigned, every interaction is animated, every pixel is themable.

## Highlights

- **Complete redesign** of every admin and user page — dashboard, server list, console, files, databases, backups, schedules, network, activity, users, nodes, locations, nests, eggs, API, audit log, monitoring, security, themes, maintenance.
- **Modular settings engine** with 13 categories (appearance, sidebar, dashboard, animations, accessibility, developer, security, performance, experimental, branding, custom, advanced) defined entirely in `theme/presets/*.json` + `theme/tokens/default.json`. Add a setting by editing JSON; no PHP/JS changes required.
- **Six built-in presets** (Blueprint Dark, Slate, Cyberpunk, Solarized Light, Mono, Aurora) plus a custom CSS / JS / HTML injector.
- **Component library** built with React 18, TypeScript, Tailwind CSS, Radix UI and Recharts.
- **Laravel integration** via a service provider, view composers, Blade directives, console commands, controllers, middleware and an admin API.
- **Animations everywhere** — fade, slide, scale, accordion, shimmer skeleton, ping, gradient shift, progress stripes.
- **Command palette** (Cmd/Ctrl-K), **notification center**, **theme manager**, **widget system**, **audit log**, **security center**.
- **Production tooling** — Vite build, TypeScript, ESLint, Prettier, Vitest, Playwright, npm and Composer scripts, GitHub Actions.

## Tech stack

| Layer | Tools |
| --- | --- |
| Front-end | React 18, TypeScript, Tailwind CSS 3.4, Radix UI, cmdk, Recharts, framer-motion, class-variance-authority |
| Build | Vite 5 |
| Back-end | Laravel 11 (ServiceProvider, Blade, View Composers, Console Commands) |
| Pterodactyl | 1.11+ |

## Quick start

```bash
git clone https://github.com/your-org/blueprint
cd blueprint
composer install
npm install
npm run build
php artisan blueprint:install
```

The installer publishes the theme files into your Pterodactyl panel and writes the necessary CSS overrides. Reload the panel in your browser.

## Project layout

```
blueprint/
├── app/                  Laravel side (ServiceProvider, commands, controllers, middleware, helpers)
├── resources/
│   ├── css/              Tailwind layer + design system (app, admin, auth, layout, components)
│   ├── js/               Vite entries (app, admin, auth, console, files, widgets)
│   ├── images/           Logo, favicon, OG image
│   └── views/            Blade templates (layouts, partials, components)
├── routes/blueprint.php  API routes (manifest, settings, reset)
├── scripts/              Build / install helpers
├── src/                  React component library (components, hooks, utils, config, types)
├── theme/
│   ├── presets/          JSON theme presets
│   └── tokens/           default.json manifest (single source of truth)
├── config/blueprint.php  Laravel config
├── composer.json
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## License

MIT
