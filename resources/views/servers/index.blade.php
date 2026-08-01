@extends('blueprint::layouts.app')

@section('title', 'Servers')

@section('content')
    <div class="page page-servers">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Your servers</h1>
                <p class="page-description">All servers owned by {{ auth()->user()->username }} across the panel.</p>
            </div>
            <div class="page-header-actions">
                <a href="{{ url('/servers/new') }}" class="bp-button bp-button--primary">
                    <x-icon name="server" class="h-4 w-4" /> New server
                </a>
            </div>
        </header>

        <div class="page-toolbar">
            <div class="server-list-filters">
                <input type="search" class="bp-input" placeholder="Search servers…" />
                <select class="bp-select">
                    <option>All statuses</option>
                    <option>Running</option>
                    <option>Stopped</option>
                    <option>Starting</option>
                    <option>Crashed</option>
                </select>
                <select class="bp-select">
                    <option>All nodes</option>
                    @foreach (($nodes ?? []) as $node)
                        <option>{{ $node->name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="server-list-actions">
                <button class="bp-button bp-button--ghost">Refresh</button>
            </div>
        </div>

        <section class="bp-grid bp-grid--3">
            @forelse (($servers ?? []) as $srv)
                <x-server-card :server="$srv" />
            @empty
                <x-empty-state
                    title="No servers yet"
                    description="Provision your first container in seconds."
                    icon="server"
                    action-url="/servers/new"
                    action-label="Create server"
                />
            @endforelse
        </section>
    </div>
@endsection
