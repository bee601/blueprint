@extends('blueprint::layouts.auth')

@section('title', 'Activity')

@section('content')
    <div class="page page-activity">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Activity</h1>
                <p class="page-description">Every action across your panel.</p>
            </div>
        </header>

        <section class="bp-card">
            <div class="bp-card-body">
                <table class="bp-table">
                    <thead>
                        <tr><th>Time</th><th>Actor</th><th>Action</th><th>Target</th><th>IP</th></tr>
                    </thead>
                    <tbody>
                        @foreach (($activities ?? []) as $event)
                            <tr>
                                <td>{{ $event['timestamp'] }}</td>
                                <td>{{ $event['actor'] }}</td>
                                <td><span class="bp-badge">{{ $event['action'] }}</span></td>
                                <td>{{ $event['target'] }}</td>
                                <td><code>{{ $event['ip'] }}</code></td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </section>
    </div>
@endsection
