<?php

declare(strict_types=1);

namespace Blueprint\Theme\Providers;

use Blueprint\Theme\Settings\CssResolver;
use Blueprint\Theme\Settings\ManifestExporter;
use Blueprint\Theme\Settings\SettingsEngine;
use Illuminate\Cache\CacheManager;
use Illuminate\Contracts\Container\Container;
use Illuminate\Contracts\Http\Kernel;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\View\Compilers\BladeCompiler;

/**
 * Wires Blueprint into a standard Pterodactyl Panel installation.
 *
 * - Publishes theme JSON files into /theme (or /storage/blueprint)
 * - Registers view namespaces for both the legacy Blade and React/TSX views
 * - Injects a CSS variable stylesheet via a Blade directive
 * - Exposes /api/blueprint/settings so the React UI can boot offline-first
 */
class BlueprintServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../../config/blueprint.php', 'blueprint');

        $this->app->singleton(SettingsEngine::class, function (Container $container): SettingsEngine {
            return new SettingsEngine(
                $container,
                __DIR__ . '/../../theme/tokens/default.json',
                __DIR__ . '/../../theme/presets',
            );
        });

        $this->app->singleton(CssResolver::class, fn (Container $container) => new CssResolver($container->make(SettingsEngine::class)));
        $this->app->singleton(ManifestExporter::class, fn (Container $container) => new ManifestExporter($container->make(SettingsEngine::class)));
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'blueprint');
        $this->loadTranslationsFrom(__DIR__ . '/../../resources/lang', 'blueprint');

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../../theme' => $this->app->basePath('theme'),
                __DIR__ . '/../../resources/views' => $this->app->basePath('resources/views/vendor/blueprint'),
                __DIR__ . '/../../public' => $this->app->basePath('public/vendor/blueprint'),
                __DIR__ . '/../../config/blueprint.php' => config_path('blueprint.php'),
            ], 'blueprint-config');

            $this->commands([
                \Blueprint\Theme\Console\InstallCommand::class,
                \Blueprint\Theme\Console\PublishAssetsCommand::class,
                \Blueprint\Theme\Console\BuildCommand::class,
                \Blueprint\Theme\Console\ResetSettingsCommand::class,
            ]);
        }

        $this->registerRoutes();
        $this->registerBladeDirectives();
        $this->registerViewComposers();
    }

    protected function registerRoutes(): void
    {
        Route::middleware(['web', 'auth'])->prefix('api/blueprint')->group(__DIR__ . '/../../routes/blueprint.php');
    }

    protected function registerBladeDirectives(): void
    {
        Blade::directive('blueprintCss', function (): string {
            return '<?php echo app(\\Blueprint\\Theme\\Settings\\CssResolver::class)->inlineStyle(); ?>';
        });

        Blade::directive('blueprintConfig', function (): string {
            return '<?php echo "<script>window.BlueprintConfig = " . json_encode(config("blueprint")) . ";</script>"; ?>';
        });

        Blade::directive('blueprintManifest', function (): string {
            return '<?php echo "<script id=\"blueprint-manifest\" type=\"application/json\">" . app(\\Blueprint\\Theme\\Settings\\ManifestExporter::class)->toJson() . "</script>"; ?>';
        });
    }

    protected function registerViewComposers(): void
    {
        $this->app['view']->composer('blueprint::layouts.app', function ($view): void {
            $view->with('blueprintSettings', $this->app->make(SettingsEngine::class)->resolved());
        });

        $this->app['view']->composer('blueprint::admin.layouts.app', function ($view): void {
            $view->with('blueprintPresets', $this->app->make(SettingsEngine::class)->presets());
        });
    }
}
