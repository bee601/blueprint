@extends('blueprint::layouts.app')

@section('title', 'API keys')

@section('content')
    <div class="page page-account-api">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">API keys</h1>
                <p class="page-description">Create keys to access the panel programmatically.</p>
            </div>
            <div class="page-header-actions">
                <button class="bp-button bp-button--primary">Create API key</button>
            </div>
        </header>

        <section class="bp-card">
            <table class="bp-table">
                <thead>
                    <tr><th>Identifier</th><th>Memo</th><th>Created</th><th>Last used</th><th></th></tr>
                </thead>
                <tbody>
                    @foreach (($keys ?? []) as $key)
                        <tr>
                            <td><code>{{ $key->identifier }}</code></td>
                            <td>{{ $key->memo }}</td>
                            <td>{{ $key->created_at }}</td>
                            <td>{{ $key->last_used_at ?? 'Never' }}</td>
                            <td><button class="bp-button bp-button--ghost bp-button--danger">Revoke</button></td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </section>
    </div>
@endsection
