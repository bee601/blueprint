@props(['server', 'compact' => false])

<div class="bp-server-card {{ $compact ? 'is-compact' : '' }}">
    <header class="bp-server-card-header">
        <div>
            <span class="bp-status-indicator {{ $server->status ?? 'running' }}"></span>
            <a class="bp-server-card-name" href="{{ route('server.show', $server) }}">{{ $server->name }}</a>
        </div>
        <span class="bp-badge">{{ $server->node->name ?? '—' }}</span>
    </header>
    <div class="bp-server-card-body">
        <div class="bp-server-card-resource">
            <div class="bp-server-card-resource-label"><span>CPU</span><span>{{ $server->resources['cpu'] ?? 0 }}%</span></div>
            <div class="bp-progress"><div class="bp-progress-bar" style="width: {{ $server->resources['cpu'] ?? 0 }}%"></div></div>
        </div>
        <div class="bp-server-card-resource">
            <div class="bp-server-card-resource-label"><span>Memory</span><span>{{ $server->resources['memory'] ?? 0 }}%</span></div>
            <div class="bp-progress"><div class="bp-progress-bar" style="width: {{ $server->resources['memory'] ?? 0 }}%"></div></div>
        </div>
        <div class="bp-server-card-resource">
            <div class="bp-server-card-resource-label"><span>Disk</span><span>{{ $server->resources['disk'] ?? 0 }}%</span></div>
            <div class="bp-progress"><div class="bp-progress-bar" style="width: {{ $server->resources['disk'] ?? 0 }}%"></div></div>
        </div>
    </div>
    @unless ($compact)
        <footer class="bp-server-card-footer">
            <x-server-power :server="$server" compact />
            <a href="{{ route('server.console', $server) }}" class="bp-button bp-button--ghost">Console</a>
        </footer>
    @endunless
</div>
