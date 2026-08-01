@extends('blueprint::layouts.app')

@section('title', $server->name . ' · Schedules')

@section('content')
    <div class="page page-server-schedules">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Schedules</h1>
                <p class="page-description">Cron-based tasks for {{ $server->name }}.</p>
            </div>
            <div class="page-header-actions">
                <button class="bp-button bp-button--primary">New schedule</button>
            </div>
        </header>

        <section class="bp-grid bp-grid--2">
            @foreach (($schedules ?? []) as $schedule)
                <div class="bp-card">
                    <header class="bp-card-header">
                        <h2 class="bp-card-title">{{ $schedule->name }}</h2>
                        <span class="bp-toggle {{ $schedule->is_active ? 'is-on' : '' }}"></span>
                    </header>
                    <div class="bp-card-body">
                        <p class="bp-card-meta">Cron: <code>{{ $schedule->cron }}</code> · Next run: {{ $schedule->next_run }}</p>
                        <ul class="schedule-tasks">
                            @foreach ($schedule->tasks as $task)
                                <li>
                                    <span class="bp-badge">{{ $task->action }}</span>
                                    <code>{{ $task->payload }}</code>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            @endforeach
        </section>
    </div>
@endsection
