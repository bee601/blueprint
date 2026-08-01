<?php

namespace Blueprint\ViewComposers;

use Blueprint\Settings\SettingsEngine;
use Illuminate\View\View;

class SettingsComposer
{
    public function __construct(protected SettingsEngine $settings) {}

    public function compose(View $view): void
    {
        $view->with('blueprintResolved', $this->settings->resolved());
        $view->with('blueprintManifest', $this->settings->manifest());
    }
}
