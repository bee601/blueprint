@extends('blueprint::admin.layouts.app')

@section('title', 'Admin · Audit log')

@section('content')
    <div class="page page-admin-audit">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Audit log</h1>
                <p class="page-description">Cryptographically signed trail of administrative actions.</p>
            </div>
        </header>

        <section class="bp-card">
            <table class="bp-table">
                <thead>
                    <tr><th>Timestamp</th><th>Actor</th><th>Action</th><th>Subject</th><th>IP</th><th>Hash</th></tr>
                </thead>
                <tbody>
                    @foreach (($events ?? []) as $event)
                        <tr>
                            <td>{{ $event['timestamp'] }}</td>
                            <td>{{ $event['actor'] }}</td>
                            <td><span class="bp-badge">{{ $event['action'] }}</span></td>
                            <td>{{ $event['subject'] }}</td>
                            <td><code>{{ $event['ip'] }}</code></td>
                            <td><code>{{ substr($event['hash'], 0, 12) }}</code></td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </section>
    </div>
@endsection