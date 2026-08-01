<?php

declare(strict_types=1);

namespace Blueprint\Theme\Console;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class BuildCommand extends Command
{
    protected $signature = 'blueprint:build {--watch : Watch mode}';
    protected $description = 'Build the Blueprint React/Tailwind bundle via Vite.';

    public function handle(): int
    {
        $npm = $this->findNpm();
        if ($npm === null) {
            $this->error('npm is not installed or not on PATH. Install Node.js >= 18 first.');
            return self::FAILURE;
        }

        $args = ['run', $this->option('watch') ? 'watch' : 'build'];
        $process = new Process([$npm, ...$args], base_path());
        $process->setTimeout(null);

        $this->info(($this->option('watch') ? 'Watching' : 'Building') . ' Blueprint bundle...');
        $process->run(function ($type, $buffer): void {
            $this->output->write($buffer);
        });

        return $process->isSuccessful() ? self::SUCCESS : self::FAILURE;
    }

    protected function findNpm(): ?string
    {
        foreach (['npm', 'npm.cmd', 'npm.exe'] as $bin) {
            $path = trim((string) shell_exec("command -v {$bin} 2>/dev/null || where {$bin} 2>nul"));
            if ($path !== '') {
                return $path;
            }
        }
        return null;
    }
}
