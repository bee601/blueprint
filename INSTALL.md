# Installation

This guide installs Blueprint inside a working **Pterodactyl Panel 1.11+** checkout.

## Prerequisites

- PHP 8.2 or newer
- Node 20 or newer
- Composer 2
- A working Pterodactyl installation (panel + at least one daemon)

## Steps

1. **Clone into your panel's `addons/` directory.**

   ```bash
   cd /var/www/pterodactyl
   git clone https://github.com/your-org/blueprint.git themes/blueprint
   cd themes/blueprint
   ```

2. **Install dependencies.**

   ```bash
   composer install --no-dev --optimize-autoloader
   npm install
   ```

3. **Build the assets.**

   ```bash
   npm run build
   ```

   Output is written to `dist/` and ready to publish.

4. **Register the service provider.** Pterodactyl uses the standard Laravel auto-discovery, but if you've disabled it, add the provider manually:

   ```php
   // config/app.php
   'providers' => [
       ...
       App\Providers\BlueprintServiceProvider::class,
   ],
   ```

5. **Publish the assets into your public directory.**

   ```bash
   php artisan blueprint:publish-assets
   ```

   This copies `dist/css/` and `dist/js/` to `public/vendor/blueprint/` and the Blade views to `resources/views/vendor/blueprint/`.

6. **(Optional) Set your default preset.**

   ```php
   // config/blueprint.php
   return [
       'theme' => 'blueprint-dark',
       'mode'  => 'dark',
   ];
   ```

7. **Reload the panel.**

   ```bash
   php artisan view:clear
   php artisan cache:clear
   ```

## Updating

```bash
cd themes/blueprint
git pull
composer install
npm install && npm run build
php artisan blueprint:publish-assets
php artisan view:clear
```

## Uninstalling

```bash
php artisan blueprint:reset
rm -rf themes/blueprint
php artisan view:clear
```
