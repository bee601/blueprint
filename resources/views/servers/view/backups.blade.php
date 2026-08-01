@extends('blueprint::layouts.app')

@section('title', $server->name . ' · Backups')

@section('content')
    <div class="page page-server-backups">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Backups</h1>
                <p class="page-description">Snapshots and remote backup targets for {{ $server->name }}.</p>
            </div>
            <div class="page-header-actions">
                <button class="bp-button bp-button--primary">Create backup</button>
            </div>
        </header>

        <section class="bp-card">
            <table class="bp-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Checksum</th>
                        <th>Created</th>
                        <th>Completed</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach (($backups ?? []) as $backup)
                        <tr>
                            <td>{{ $backup->name }}</td>
                            <td>{{ $backup->bytes_human }}</td>
                            <td><code>{{ substr($backup->checksum ?? '', 0, 12) }}</code></td>
                            <td>{{ $backup->created_at }}</td>
                            <td>{{ $backup->completed_at ?? '—' }}</td>
                            <td>
                                <button class="bp-button bp-button--ghost">Download</button>
                                <button class="bp-button bp-button--ghost bp-button--danger">Delete</button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </section>
    </div>
@endsection
