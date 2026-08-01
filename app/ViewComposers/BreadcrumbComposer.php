<?php

namespace Blueprint\ViewComposers;

use Illuminate\Support\Facades\Route;
use Illuminate\View\View;

class BreadcrumbComposer
{
    public function compose(View $view): void
    {
        $view->with('breadcrumbItems', $this->build());
    }

    protected function build(): array
    {
        $route = Route::current();
        if (! $route) {
            return [];
        }
        $name = $route->getName();
        $items = [['label' => 'Home', 'href' => url('/')]];
        $segments = explode('.', (string) $name);
        if ($segments) {
            $label = ucfirst(str_replace('-', ' ', end($segments)));
            $items[] = ['label' => $label];
        }
        return $items;
    }
}
