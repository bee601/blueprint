@props(['node'])

<div class="bp-card node-card">
    <header class="bp-card-header">
        <div>
            <span class="bp-status-indicator {{ $node->status }}"></span>
            <h2 class="bp-card-title"><a href="{{ route('admin.nodes.show', $node) }}">{{ $node->name }}</a></h2>
            <p class="bp-card-meta">{{ $node->fqdn }}:{{ $node->daemonListen }}</p>
        </div>
        <span class="bp-badge">{{ $node->location->short ?? '—' }}</span>
    </header>
    <div class="bp-card-body">
        <div class="node-card-resource">
            <span>Memory</span>
            <div class="bp-progress"><div class="bp-progress-bar" style="width: {{ $node->memoryPct ?? 0 }}%"></div></div>
            <span>{{ $node->memoryPct ?? 0 }}%</span>
        </div>
        <div class="node-card-resource">
            <span>Disk</span>
            <div class="bp-progress"><div class="bp-progress-bar" style="width: {{ $node->diskPct ?? 0 }}%"></div></div>
            <span>{{ $node->diskPct ?? 0 }}%</span>
        </div>
        <div class="node-card-resource">
            <span>CPU</span>
            <div class="bp-progress"><div class="bp-progress-bar" style="width: {{ $node->cpuPct ?? 0 }}%"></div></div>
            <span>{{ $node->cpuPct ?? 0 }}%</span>
        </div>
        <dl class="bp-list">
            <dt>Servers</dt><dd>{{ $node->servers_count ?? 0 }} / {{ $node->memory / 1024 }} GB</dd>
            <dt>Daemon</dt><dd>v{{ $node->daemon_version ?? '—' }}</dd>
            <dt>Last heartbeat</dt><dd>{{ $node->updated_at->diffForHumans() ?? '—' }}</dd>
        </dl>
    </div>
</div>