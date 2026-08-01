@extends('blueprint::admin.layouts.app')

@section('title', 'Admin Dashboard')

@section('content')
    <div class="page page-admin-dashboard">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Infrastructure overview</h1>
                <p class="page-description">Realtime stats and health for your entire panel.</p>
            </div>
            <div class="page-header-actions">
                <select class="bp-select">
                    <option>Last 1 hour</option>
                    <option>Last 24 hours</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                </select>
                <button class="bp-button">Export</button>
            </div>
        </header>

        <section class="bp-grid bp-grid--5 admin-stats">
            <x-stat-card label="Nodes" :value="$stats['nodes'] ?? 0" :delta="$stats['nodes_active'] ?? 0 . ' online'" icon="globe" />
            <x-stat-card label="Servers" :value="$stats['servers'] ?? 0" :delta="$stats['servers_running'] ?? 0 . ' running'" icon="server" trend="up" />
            <x-stat-card label="Users" :value="$stats['users'] ?? 0" :delta="'+' . ($stats['users_new'] ?? 0)" icon="users" trend="up" />
            <x-stat-card label="CPU" :value="($stats['cpu'] ?? 0) . '%'" :delta="avg across nodes" icon="activity" />
            <x-stat-card label="Memory" :value="($stats['memory'] ?? 0) . '%'" :delta="$stats['memory_total'] ?? ''" icon="server" />
        </section>

        <section class="bp-grid bp-grid--2">
            <div class="bp-card">
                <header class="bp-card-header">
                    <h2 class="bp-card-title">CPU & memory</h2>
                </header>
                <div class="bp-card-body">
                    <canvas id="admin-usage-chart" data-cpu='@json($charts['cpu'] ?? [])' data-mem='@json($charts['memory'] ?? [])'></canvas>
                </div>
            </div>
            <div class="bp-card">
                <header class="bp-card-header">
                    <h2 class="bp-card-title">Network throughput</h2>
                </header>
                <div class="bp-card-body">
                    <canvas id="admin-network-chart"></canvas>
                </div>
            </div>
        </section>

        <section class="bp-grid bp-grid--3 admin-secondary">
            <div class="bp-card span-2">
                <header class="bp-card-header">
                    <h2 class="bp-card-title">Node health</h2>
                    <a href="{{ url('/admin/nodes') }}" class="bp-card-link">View all →</a>
                </header>
                <div class="bp-card-body">
                    <table class="bp-table">
                        <thead><tr><th>Node</th><th>Status</th><th>CPU</th><th>Memory</th><th>Disk</th></tr></thead>
                        <tbody>
                            @foreach (($nodes ?? []) as $node)
                                <tr>
                                    <td>{{ $node->name }}</td>
                                    <td><span class="bp-status-indicator {{ $node->status }}"></span>{{ ucfirst($node->status) }}</td>
                                    <td>{{ $node->cpu }}%</td>
                                    <td>{{ $node->memory }}%</td>
                                    <td>{{ $node->disk }}%</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">Latest events</h2></header>
                <div class="bp-card-body">
                    <ul class="activity-feed">
                        @foreach (($events ?? []) as $event)
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