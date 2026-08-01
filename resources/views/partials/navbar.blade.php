@php
    $user = auth()->user();
    $breadcrumb = $breadcrumb ?? null;
@endphp

<nav class="layout-navbar">
    <div class="layout-navbar-left">
        <button class="layout-sidebar-mobile-trigger" aria-label="Toggle menu">
            <x-icon name="menu" class="h-5 w-5" />
        </button>
        @if ($breadcrumb)
            <div class="layout-breadcrumb">
                {!! $breadcrumb !!}
            </div>
        @endif
    </div>

    <div class="layout-navbar-right">
        <button class="layout-search-trigger" data-action="open-command">
            <x-icon name="search" class="h-4 w-4" />
            <span class="layout-search-placeholder">Search servers, nodes, users…</span>
            <kbd class="layout-search-shortcut">⌘ K</kbd>
        </button>

        <div class="layout-theme-switcher" data-theme-switcher>
            <button class="layout-icon-button" data-theme="light" aria-label="Light mode">
                <x-icon name="sun" class="h-4 w-4" />
            </button>
            <button class="layout-icon-button" data-theme="dark" aria-label="Dark mode">
                <x-icon name="moon" class="h-4 w-4" />
            </button>
            <button class="layout-icon-button" data-theme="system" aria-label="System">
                <x-icon name="monitor" class="h-4 w-4" />
            </button>
        </div>

        <button class="layout-icon-button" data-action="open-notifications" aria-label="Notifications">
            <x-icon name="bell" class="h-4 w-4" />
            <span class="layout-icon-button-dot"></span>
        </button>

        @if ($user)
            <div class="layout-user-menu" data-dropdown>
                <button class="layout-user-trigger" data-dropdown-trigger>
                    <span class="layout-avatar">
                        <img src="https://api.dicebear.com/9.x/initials/svg?seed={{ urlencode($user->name_first ?? $user->username) }}" alt="" />
                    </span>
                    <span class="layout-user-name">{{ $user->name_first ?? $user->username }}</span>
                    <x-icon name="chevron-down" class="h-3 w-3" />
                </button>
                <div class="layout-dropdown">
                    <a href="{{ url('/account') }}" class="layout-dropdown-item">
                        <x-icon name="user" class="h-4 w-4" /> Account
                    </a>
                    <a href="{{ url('/account/settings') }}" class="layout-dropdown-item">
                        <x-icon name="settings" class="h-4 w-4" /> Settings
                    </a>
                    <div class="layout-dropdown-divider"></div>
                    <form method="POST" action="{{ url('/logout') }}">
                        @csrf
                        <button class="layout-dropdown-item layout-dropdown-item--destructive" type="submit">
                            <x-icon name="log-out" class="h-4 w-4" /> Sign out
                        </button>
                    </form>
                </div>
            </div>
        @endif
    </div>
</nav>
