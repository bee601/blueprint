<?php

namespace Blueprint\Http\Middleware;

use Blueprint\Settings\SettingsEngine;
use Closure;
use Illuminate\Http\Request;

class ShareBlueprintTheme
{
    public function __construct(protected SettingsEngine $settings) {}

    public function handle(Request $request, Closure $next)
    {
        view()->share('blueprintResolved', $this->settings->resolved());
        view()->share('blueprintManifest', $this->settings->manifest());
        return $next($request);
    }
}
