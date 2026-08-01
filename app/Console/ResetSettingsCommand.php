<?php

declare(strict_types=1);

namespace Blueprint\Theme\Console;

use Blueprint\Theme\Settings\SettingsEngine;
use Illuminate\Console\Command;

class ResetSettingsCommand extends Command
{
    protected $signature = 'blueprint:reset {category? : The category to reset. Defaults to all.}';
    protected $description = 'Reset Blueprint settings to defaults.';

    public function handle(SettingsEngine $engine): int
    {
        $category = $this->argument('category');
        $engine->reset($category);

        if ($category) {
            $this->info("Reset category '{$category}' to defaults.");
        } else {
            $this->info('Reset all Blueprint settings to defaults.');
        }

        return self::SUCCESS;
    }
}
