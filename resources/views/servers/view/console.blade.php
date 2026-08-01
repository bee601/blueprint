@extends('blueprint::layouts.app')

@section('title', $server->name . ' · Console')

@section('content')
    <div class="page page-server-console">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">{{ $server->name }} — Console</h1>
                <p class="page-description">Live output from the container. Press <kbd>Ctrl+C</kbd> to interrupt.</p>
            </div>
            <div class="page-header-actions">
                <x-server-power :server="$server" />
            </div>
        </header>

        <section class="bp-card">
            <div class="bp-card-body server-console-body">
                <div class="terminal-toolbar">
                    <span class="terminal-status"><span class="bp-status-indicator running"></span> Connected</span>
                    <div class="terminal-actions">
                        <button class="bp-button bp-button--ghost" data-action="terminal-clear">Clear</button>
                        <button class="bp-button bp-button--ghost" data-action="terminal-pause">Pause</button>
                        <button class="bp-button bp-button--ghost" data-action="terminal-fullscreen">Fullscreen</button>
                    </div>
                </div>
                <div class="terminal-output" id="terminal-output" data-server-uuid="{{ $server->uuid }}" data-ws-token="{{ $token ?? '' }}"></div>
                <form class="terminal-input" data-terminal-input>
                    <span class="terminal-prompt">$</span>
                    <input type="text" placeholder="Send a command…" autocomplete="off" />
                </form>
            </div>
        </section>
    </div>
@endsection

@push('scripts')
    @vite(['resources/js/console.tsx'])
@endpush
