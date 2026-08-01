<?php

declare(strict_types=1);

namespace Blueprint\Theme\Console;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class PublishAssetsCommand extends Command
{
    protected $signature = 'blueprint:publish {--target= : Where to publish (public, theme, views)}';
    protected $description = 'Copy built assets to the public directory.';

    public function handle(): int
    {
        $source = __DIR__ . '/../../public/build';
        $target = public_path('vendor/blueprint');

        if (!is_dir($source)) {
            $this->warn('Build directory not found. Run "blueprint:build" first.');
            return self::FAILURE;
        }

        if (!is_dir($target)) {
            mkdir($target, 0755, true);
        }

        $process = Process::fromShellCommandline(sprintf('cp -R %s/* %s', escapeshellarg($source), escapeshellarg($target)));
        $process->run();

        $this->info("Published Blueprint assets to {$target}.");
        return self::SUCCESS;
    }
}
