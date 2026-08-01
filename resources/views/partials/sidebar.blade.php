@php
    /** @var \Illuminate\Contracts\Auth\Authenticatable|null $user */
    $user = auth()->user();
    $isAdmin = $user?->root_admin ?? false;
    $server = request()->route('server');
@endphp

<aside class="layout-sidebar" data-sidebar="main">
    <div class="layout-sidebar-header">
        <a href="{{ url('/') }}" class="layout-brand">
            <img src="{{ asset('images/logo.svg') }}" alt="Logo" class="layout-brand-icon">
            <span class="layout-brand-text">Blueprint</span>
        </a>
        <button class="layout-sidebar-toggle" aria-label="Toggle sidebar">
            <x-icon name="chevrons-left" class="h-4 w-4" />
        </button>
    </div>

    <nav class="layout-sidebar-nav">
        <p class="layout-sidebar-label">Overview</p>
        <a href="{{ url('/') }}" class="layout-sidebar-link {{ request()->is('/') ? 'is-active' : '' }}">
            <x-icon name="gauge" class="h-4 w-4" /> Dashboard
        </a>
        <a href="{{ url('/servers') }}" class="layout-sidebar-link {{ request()->is('servers*') ? 'is-active' : '' }}">
            <x-icon name="server" class="h-4 w-4" /> Servers
        </a>
        <a href="{{ url('/activity') }}" class="layout-sidebar-link {{ request()->is('activity*') ? 'is-active' : '' }}">
            <x-icon name="activity" class="h-4 w-4" /> Activity
        </a>

        <p class="layout-sidebar-label">Account</p>
        <a href="{{ url('/account') }}" class="layout-sidebar-link {{ request()->is('account*') ? 'is-active' : '' }}">
            <x-icon name="user" class="h-4 w-4" /> Profile
        </a>
        <a href="{{ url('/account/api') }}" class="layout-sidebar-link {{ request()->is('account/api*') ? 'is-active' : '' }}">
            <x-icon name="key-round" class="h-4 w-4" /> API keys
        </a>
        <a href="{{ url('/account/security') }}" class="layout-sidebar-link {{ request()->is('account/security*') ? 'is-active' : '' }}">
            <x-icon name="shield" class="h-4 w-4" /> Security
        </a>

        @if ($isAdmin)
            <p class="layout-sidebar-label">Admin</p>
            <a href="{{ url('/admin') }}" class="layout-sidebar-link {{ request()->is('admin') ? 'is-active' : '' }}">
                <x-icon name="layout-dashboard" class="h-4 w-4" /> Overview
            </a>
            <a href="{{ url('/admin/servers') }}" class="layout-sidebar-link {{ request()->is('admin/servers*') ? 'is-active' : '' }}">
                <x-icon name="server" class="h-4 w-4" /> Servers
            </a>
            <a href="{{ url('/admin/nodes') }}" class="layout-sidebar-link {{ request()->is('admin/nodes*') ? 'is-active' : '' }}">
                <x-icon name="globe" class="h-4 w-4" /> Nodes
            </a>
            <a href="{{ url('/admin/users') }}" class="layout-sidebar-link {{ request()->is('admin/users*') ? 'is-active' : '' }}">
                <x-icon name="users" class="h-4 w-4" /> Users
            </a>
            <a href="{{ url('/admin/settings') }}" class="layout-sidebar-link {{ request()->is('admin/settings*') ? 'is-active' : '' }}">
                <x-icon name="settings" class="h-4 w-4" /> Settings
            </a>
        @endif
    </nav>

    <div class="layout-sidebar-footer">
        <button class="layout-sidebar-collapse" data-action="collapse">
            <x-icon name="chevrons-left" class="h-4 w-4" />
            <span>Collapse</span>
        </button>
    </div>
</aside>
