@extends('blueprint::layouts.app')

@section('title', $server->name . ' · Activity')

@section('content')
    <div class="page page-server-activity">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Activity log</h1>
                <p class="page-description">Audit trail for {{ $server->name }}.</p>
            </div>
        </header>

        <section class="bp-card">
            <div class="bp-card-body">
                <ul class="activity-feed">
                    @foreach (($activities ?? []) as $event)
                        <li class="activity-feed-item">
                            <span class="activity-feed-dot {{ $event['tone'] ?? 'info' }}"></span>
                            <div>
                                <p class="activity-feed-title">{{ $event['title'] }}</p>
                                <p class="activity-feed-meta">{{ $event['actor'] }} · {{ $event['timestamp'] }}</p>
                            </div>
                        </li>
                    @endforeach
                </ul>
            </div>
        </section>
    </div>
@endsection
