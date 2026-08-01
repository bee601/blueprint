<aside class="layout-sidebar" data-sidebar="admin">
    <div class="layout-sidebar-header">
        <a href="{{ url('/admin') }}" class="layout-brand">
            <img src="{{ asset('images/logo.svg') }}" alt="Logo" class="layout-brand-icon">
            <span class="layout-brand-text">Blueprint Admin</span>
        </a>
    </div>

    <nav class="layout-sidebar-nav">
        <p class="layout-sidebar-label">Overview</p>
        <a href="{{ url('/admin') }}" class="layout-sidebar-link {{ request()->is('admin') ? 'is-active' : '' }}">
            <x-icon name="layout-dashboard" class="h-4 w-4" /> Dashboard
        </a>
        <a href="{{ url('/admin/monitoring') }}" class="layout-sidebar-link {{ request()->is('admin/monitoring*') ? 'is-active' : '' }}">
            <x-icon name="activity" class="h-4 w-4" /> Monitoring
        </a>
        <a href="{{ url('/admin/audit') }}" class="layout-sidebar-link {{ request()->is('admin/audit*') ? 'is-active' : '' }}">
            <x-icon name="shield" class="h-4 w-4" /> Audit log
        </a>

        <p class="layout-sidebar-label">Infrastructure</p>
        <a href="{{ url('/admin/servers') }}" class="layout-sidebar-link {{ request()->is('admin/servers*') ? 'is-active' : '' }}">
            <x-icon name="server" class="h-4 w-4" /> Servers
        </a>
        <a href="{{ url('/admin/nodes') }}" class="layout-sidebar-link {{ request()->is('admin/nodes*') ? 'is-active' : '' }}">
            <x-icon name="globe" class="h-4 w-4" /> Nodes
        </a>
        <a href="{{ url('/admin/locations') }}" class="layout-sidebar-link {{ request()->is('admin/locations*') ? 'is-active' : '' }}">
            <x-icon name="map-pin" class="h-4 w-4" /> Locations
        </a>
        <a href="{{ url('/admin/nests') }}" class="layout-sidebar-link {{ request()->is('admin/nests*') ? 'is-active' : '' }}">
            <x-icon name="layers" class="h-4 w-4" /> Nests
        </a>
        <a href="{{ url('/admin/eggs') }}" class="layout-sidebar-link {{ request()->is('admin/eggs*') ? 'is-active' : '' }}">
            <x-icon name="package" class="h-4 w-4" /> Eggs
        </a>

        <p class="layout-sidebar-label">People</p>
        <a href="{{ url('/admin/users') }}" class="layout-sidebar-link {{ request()->is('admin/users*') ? 'is-active' : '' }}">
            <x-icon name="users" class="h-4 w-4" /> Users
        </a>

        <p class="layout-sidebar-label">Configuration</p>
        <a href="{{ url('/admin/api') }}" class="layout-sidebar-link {{ request()->is('admin/api*') ? 'is-active' : '' }}">
            <x-icon name="key-round" class="h-4 w-4" /> API
        </a>
        <a href="{{ url('/admin/settings') }}" class="layout-sidebar-link {{ request()->is('admin/settings*') ? 'is-active' : '' }}">
            <x-icon name="settings" class="h-4 w-4" /> Settings
        </a>
        <a href="{{ url('/admin/themes') }}" class="layout-sidebar-link {{ request()->is('admin/themes*') ? 'is-active' : '' }}">
            <x-icon name="palette" class="h-4 w-4" /> Theme
        </a>
        <a href="{{ url('/admin/maintenance') }}" class="layout-sidebar-link {{ request()->is('admin/maintenance*') ? 'is-active' : '' }}">
            <x-icon name="wrench" class="h-4 w-4" /> Maintenance
        </a>
        <a href="{{ url('/admin/security') }}" class="layout-sidebar-link {{ request()->is('admin/security*') ? 'is-active' : '' }}">
            <x-icon name="lock" class="h-4 w-4" /> Security
        </a>
    </nav>
</aside>
