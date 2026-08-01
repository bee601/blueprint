@extends('blueprint::admin.layouts.app')

@section('title', 'Admin · Monitoring')

@section('content')
    <div class="page page-admin-monitoring">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Live monitoring</h1>
                <p class="page-description">Live streaming metrics from every daemon.</p>
            </div>
            <div class="page-header-actions">
                <span class="bp-status-indicator online"></span>
                <span class="text-sm">Streaming</span>
            </div>
        </header>

        <section class="bp-grid bp-grid--3 monitoring-grid">
            <div class="bp-card span-2">
                <header class="bp-card-header"><h2 class="bp-card-title">Cluster CPU</h2></header>
                <div class="bp-card-body"><canvas id="monitoring-cpu-chart"></canvas></div>
            </div>
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">Node status</h2></header>
                <div class="bp-card-body">
                    <ul class="bp-list">
                        @foreach (($nodes ?? []) as $node)
                            <li>
                                <span class="bp-status-indicator {{ $node->status }}"></span>
                                {{ $node->name }}
                                <span class="text-muted">{{ $node->cpu }}%</span>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
            <div class="bp-card span-3">
                <header class="bp-card-header"><h2 class="bp-card-title">Top servers</h2></header>
                <div class="bp-card-body">
                    <table class="bp-table">
                        <thead><tr><th>Server</th><th>CPU</th><th>Memory</th><th>Disk</th><th>Network</th></tr></thead>
                        <tbody>
                            @foreach (($topServers ?? []) as $srv)
                                <tr>
                                    <td>{{ $srv->name }}</td>
                                    <td>{{ $srv->cpu }}%</td>
                                    <td>{{ $srv->memory }}%</td>
                                    <td>{{ $srv->disk }}%</td>
                                    <td>{{ $srv->network ?? '—' }} MB/s</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
@endsection