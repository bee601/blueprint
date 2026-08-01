@extends('blueprint::layouts.app')

@section('title', $server->name . ' · Overview')

@section('content')
    <div class="page page-server-overview">
        <header class="page-header">
            <div class="page-header-text">
                <div class="server-header-meta">
                    <span class="bp-status-indicator {{ $server->status ?? 'running' }}"></span>
                    <h1 class="page-title">{{ $server->name }}</h1>
                    <span class="bp-badge">{{ $server->node->name ?? '—' }}</span>
                </div>
                <p class="page-description">Identifier: <code>{{ $server->uuidShort }}</code></p>
            </div>
            <div class="page-header-actions">
                <x-server-power :server="$server" />
            </div>
        </header>

        <nav class="server-tabs">
            <a href="{{ route('server.show', $server) }}" class="is-active">Overview</a>
            <a href="{{ route('server.console', $server) }}">Console</a>
            <a href="{{ route('server.files', $server) }}">Files</a>
            <a href="{{ route('server.databases', $server) }}">Databases</a>
            <a href="{{ route('server.backups', $server) }}">Backups</a>
            <a href="{{ route('server.schedules', $server) }}">Schedules</a>
            <a href="{{ route('server.network', $server) }}">Network</a>
            <a href="{{ route('server.startup', $server) }}">Startup</a>
            <a href="{{ route('server.activity', $server) }}">Activity</a>
            <a href="{{ route('server.settings', $server) }}">Settings</a>
        </nav>

        <section class="bp-grid bp-grid--4">
            <x-stat-card label="CPU" :value="($resources['cpu'] ?? 0) . '%'" icon="activity" />
            <x-stat-card label="Memory" :value="($resources['memory'] ?? 0) . '%'" :sub="$resources['memory_human'] ?? ''" icon="server" />
            <x-stat-card label="Disk" :value="($resources['disk'] ?? 0) . '%'" :sub="$resources['disk_human'] ?? ''" icon="package" />
            <x-stat-card label="Uptime" :value="$resources['uptime'] ?? '—'" icon="monitor" />
        </section>

        <section class="bp-grid bp-grid--3 server-overview-grid">
            <div class="bp-card span-2">
                <header class="bp-card-header">
                    <h2 class="bp-card-title">Resource history</h2>
                </header>
                <div class="bp-card-body">
                    <canvas id="server-resource-chart" data-cpu='@json($resources['history'] ?? [])'></canvas>
                </div>
            </div>
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">Details</h2></header>
                <div class="bp-card-body bp-list">
                    <dl class="bp-list">
                        <dt>Address</dt><dd>{{ $server->allocation->alias ?? '—' }}</dd>
                        <dt>Egg</dt><dd>{{ $server->egg->name ?? '—' }}</dd>
                        <dt>Node</dt><dd>{{ $server->node->name ?? '—' }}</dd>
                        <dt>Owner</dt><dd>{{ $server->owner->email ?? '—' }}</dd>
                        <dt>Limits</dt><dd>{{ $server->memory }}MB RAM · {{ $server->disk }}MB disk · {{ $server->cpu }}% CPU</dd>
                    </dl>
                </div>
            </div>
        </section>
    </div>
@endsection
