<?php

declare(strict_types=1);

namespace Blueprint\Theme\Console;

use Illuminate\Console\Command;

class InstallCommand extends Command
{
    protected $signature = 'blueprint:install {--force : Overwrite existing published files}';
    protected $description = 'Install Blueprint into a Pterodactyl Panel installation.';

    public function handle(): int
    {
        $force = (bool) $this->option('force');

        $this->info('Publishing Blueprint assets...');
        $this->call('vendor:publish', [
            '--provider' => \Blueprint\Theme\Providers\BlueprintServiceProvider::class,
            '--tag' => 'blueprint-config',
            '--force' => $force,
        ]);

        $this->info('Building CSS bundle...');
        $this->call('blueprint:build');

        $this->info('Blueprint installed. Open your panel at /admin/blueprint to configure.');
        return self::SUCCESS;
    }
}
