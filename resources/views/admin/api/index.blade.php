@extends('blueprint::admin.layouts.app')

@section('title', 'Admin · API')

@section('content')
    <div class="page page-admin-api">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">API credentials</h1>
                <p class="page-description">Manage application keys for the Pterodactyl API.</p>
            </div>
            <div class="page-header-actions">
                <button class="bp-button bp-button--primary">Create key</button>
            </div>
        </header>

        <section class="bp-card">
            <table class="bp-table">
                <thead>
                    <tr><th>Identifier</th><th>Memo</th><th>Permissions</th><th>Last used</th><th></th></tr>
                </thead>
                <tbody>
                    @foreach (($keys ?? []) as $key)
                        <tr>
                            <td><code>{{ $key->identifier }}</code></td>
                            <td>{{ $key->memo }}</td>
                            <td><span class="bp-badge">{{ count($key->allowed_ips ?? []) }} IPs</span></td>
                            <td>{{ $key->last_used_at ?? 'Never' }}</td>
                            <td><button class="bp-button bp-button--ghost bp-button--danger">Revoke</button></td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </section>
    </div>
@endsection