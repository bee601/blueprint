@extends('blueprint::layouts.app')

@section('title', $server->name . ' · Settings')

@section('content')
    <div class="page page-server-settings">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Server settings</h1>
                <p class="page-description">Danger zone — actions here are irreversible.</p>
            </div>
        </header>

        <section class="bp-grid bp-grid--2">
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">Reinstall</h2></header>
                <div class="bp-card-body">
                    <p>Reinstalls the container using the original egg configuration. Files in <code>/home/container</code> will be preserved.</p>
                    <button class="bp-button">Reinstall server</button>
                </div>
            </div>
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">Rename</h2></header>
                <div class="bp-card-body">
                    <form method="POST" action="{{ route('server.rename', $server) }}">
                        @csrf
                        <input class="bp-input" name="name" value="{{ $server->name }}" />
                        <button class="bp-button bp-button--primary" type="submit">Save</button>
                    </form>
                </div>
            </div>
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">Transfer ownership</h2></header>
                <div class="bp-card-body">
                    <input class="bp-input" placeholder="user@email" />
                    <button class="bp-button">Transfer</button>
                </div>
            </div>
            <div class="bp-card bp-card--danger">
                <header class="bp-card-header"><h2 class="bp-card-title">Delete</h2></header>
                <div class="bp-card-body">
                    <p>Permanently delete this server and all associated data.</p>
                    <button class="bp-button bp-button--danger">Delete server</button>
                </div>
            </div>
        </section>
    </div>
@endsection
