@extends('blueprint::layouts.app')

@section('title', 'Dashboard')

@section('content')
    <div class="page page-dashboard">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Welcome back, {{ auth()->user()->name_first ?? 'admin' }}</h1>
                <p class="page-description">Here's what's happening across your infrastructure today.</p>
            </div>
            <div class="page-header-actions">
                <a href="{{ url('/servers/new') }}" class="bp-button bp-button--primary">
                    <x-icon name="server" class="h-4 w-4" /> Create server
                </a>
            </div>
        </header>

        <section class="bp-grid bp-grid--4 dashboard-stats">
            <x-stat-card label="Servers" :value="$stats['servers'] ?? 0" :delta="+2 this week" icon="server" trend="up" />
            <x-stat-card label="Memory used" :value="($stats['memory_used'] ?? 0) . '%'" :delta="$stats['memory_total'] ?? '0 GB total'" icon="activity" />
            <x-stat-card label="Disk used" :value="($stats['disk_used'] ?? 0) . '%'" :delta="$stats['disk_total'] ?? '0 GB total'" icon="package" />
            <x-stat-card label="Active users" :value="$stats['users'] ?? 0" :delta="$stats['users_online'] ?? 0 . ' online'" icon="users" trend="up" />
        </section>

        <section class="dashboard-charts">
            <div class="bp-card dashboard-charts-card">
                <header class="bp-card-header">
                    <h2 class="bp-card-title">Resource usage (24h)</h2>
                    <div class="bp-tabs">
                        <button class="bp-tab is-active">CPU</button>
                        <button class="bp-tab">Memory</button>
                        <button class="bp-tab">Network</button>
                        <button class="bp-tab">Disk</button>
                    </div>
                </header>
                <div class="bp-card-body" data-chart="dashboard-area">
                    <canvas id="dashboard-area-chart"></canvas>
                </div>
            </div>
        </section>

        <section class="bp-grid bp-grid--2 dashboard-grid-secondary">
            <div class="bp-card">
                <header class="bp-card-header">
                    <h2 class="bp-card-title">Recent servers</h2>
                    <a href="{{ url('/servers') }}" class="bp-card-link">View all →</a>
                </header>
                <div class="bp-card-body">
                    @foreach (($servers ?? []) as $srv)
                        <x-server-card :server="$srv" compact />
                    @endforeach
                </div>
            </div>
            <div class="bp-card">
                <header class="bp-card-header">
                    <h2 class="bp-card-title">Activity</h2>
                    <a href="{{ url('/activity') }}" class="bp-card-link">All activity →</a>
                </header>
                <div class="bp-card-body">
                    <ul class="activity-feed">
                        @foreach (($activities ?? []) as $event)
                            <li class="activity-feed-item">
                                <span class="activity-feed-dot {{ $event['tone'] ?? 'info' }}"></span>
                                <div>
                                    <p class="activity-feed-title">{{ $event['title'] }}</p>
                                    <p class="activity-feed-meta">{{ $event['meta'] }}</p>
                                </div>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </section>
    </div>
@endsection
