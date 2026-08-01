<?php

namespace Blueprint\Support;

class ServerPower
{
    public const ACTIONS = ['start', 'stop', 'restart', 'kill'];

    public static function label(string $action): string
    {
        return match ($action) {
            'start' => 'Start',
            'stop' => 'Stop',
            'restart' => 'Restart',
            'kill' => 'Kill',
            default => ucfirst($action),
        };
    }

    public static function tone(string $action): string
    {
        return match ($action) {
            'start', 'restart' => 'success',
            'stop', 'kill' => 'danger',
            default => 'neutral',
        };
    }
}
