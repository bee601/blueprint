<?php

namespace Blueprint\ViewComposers;

use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class NavbarComposer
{
    public function compose(View $view): void
    {
        $view->with('currentUser', Auth::user());
        $view->with('isAdmin', Auth::user()?->root_admin ?? false);
    }
}
