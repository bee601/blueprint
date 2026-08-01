@extends('blueprint::layouts.app')

@section('title', $server->name . ' · Network')

@section('content')
    <div class="page page-server-network">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Allocations</h1>
                <p class="page-description">Network ports and IP addresses.</p>
            </div>
            <div class="page-header-actions">
                <button class="bp-button bp-button--primary">Assign new allocation</button>
            </div>
        </header>

        <section class="bp-card">
            <table class="bp-table">
                <thead>
                    <tr><th>IP:Port</th><th>Alias</th><th>Primary</th><th>Notes</th><th></th></tr>
                </thead>
                <tbody>
                    @foreach (($allocations ?? []) as $allocation)
                        <tr>
                            <td><code>{{ $allocation->ip }}:{{ $allocation->port }}</code></td>
                            <td>{{ $allocation->alias ?? '—' }}</td>
                            <td>@if($allocation->is_default)<span class="bp-badge">Primary</span>@endif</td>
                            <td>{{ $allocation->notes ?? '—' }}</td>
                            <td>
                                <button class="bp-button bp-button--ghost">Edit</button>
                                <button class="bp-button bp-button--ghost bp-button--danger">Unassign</button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </section>
    </div>
@endsection
