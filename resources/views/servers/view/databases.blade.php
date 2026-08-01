@extends('blueprint::layouts.app')

@section('title', $server->name . ' · Databases')

@section('content')
    <div class="page page-server-databases">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Databases</h1>
                <p class="page-description">Manage MySQL/MariaDB databases for {{ $server->name }}.</p>
            </div>
            <div class="page-header-actions">
                <button class="bp-button bp-button--primary">New database</button>
            </div>
        </header>

        <section class="bp-card">
            <table class="bp-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Host</th>
                        <th>Username</th>
                        <th>Connections from</th>
                        <th>Max connections</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach (($databases ?? []) as $db)
                        <tr>
                            <td><code>{{ $db->database }}</code></td>
                            <td>{{ $db->host->host ?? '—' }}:{{ $db->host->port ?? 3306 }}</td>
                            <td><code>{{ $db->username }}</code></td>
                            <td><code>{{ $db->remote }}</code></td>
                            <td>{{ $db->max_connections ?: 'Unlimited' }}</td>
                            <td>
                                <button class="bp-button bp-button--ghost">Rotate password</button>
                                <button class="bp-button bp-button--ghost bp-button--danger">Delete</button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </section>
    </div>
@endsection
