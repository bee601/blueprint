@extends('blueprint::admin.layouts.app')

@section('title', 'Admin · Servers')

@section('content')
    <div class="page page-admin-servers">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Servers</h1>
                <p class="page-description">{{ ($total ?? 0) . ' servers across all nodes.' }}</p>
            </div>
            <div class="page-header-actions">
                <a href="{{ url('/admin/servers/new') }}" class="bp-button bp-button--primary">Create server</a>
            </div>
        </header>

        <div class="page-toolbar">
            <div class="data-table-toolbar">
                <input type="search" class="bp-input" placeholder="Search by name, owner, UUID…" />
                <select class="bp-select">
                    <option>All nodes</option>
                    @foreach (($nodes ?? []) as $node)<option>{{ $node->name }}</option>@endforeach
                </select>
                <select class="bp-select">
                    <option>All statuses</option>
                    <option>Running</option>
                    <option>Stopped</option>
                    <option>Crashed</option>
                </select>
            </div>
        </div>

        <section class="bp-card">
            <table class="bp-table">
                <thead>
                    <tr>
                        <th>Name</th><th>Owner</th><th>Node</th><th>Status</th>
                        <th>Memory</th><th>Disk</th><th>CPU</th><th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach (($servers ?? []) as $srv)
                        <tr>
                            <td>
                                <a href="{{ route('admin.servers.show', $srv) }}">{{ $srv->name }}</a>
                                <p class="bp-cell-meta">{{ $srv->uuidShort }}</p>
                            </td>
                            <td>{{ $srv->user->email ?? '—' }}</td>
                            <td>{{ $srv->node->name ?? '—' }}</td>
                            <td><span class="bp-status-indicator {{ $srv->status }}"></span>{{ ucfirst($srv->status) }}</td>
                            <td>{{ $srv->memory }} MB</td>
                            <td>{{ $srv->disk }} MB</td>
                            <td>{{ $srv->cpu }}%</td>
                            <td>
                                <a href="{{ route('admin.servers.edit', $srv) }}" class="bp-button bp-button--ghost">Edit</a>
                                <button class="bp-button bp-button--ghost bp-button--danger">Suspend</button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <footer class="bp-card-footer">
                {{ ($servers ?? collect())->links('blueprint::partials.pagination') }}
            </footer>
        </section>
    </div>
@endsection