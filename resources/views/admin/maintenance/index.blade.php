@extends('blueprint::admin.layouts.app')

@section('title', 'Admin · Maintenance')

@section('content')
    <div class="page page-admin-maintenance">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Maintenance</h1>
                <p class="page-description">Toggle maintenance mode, cache, sessions and queues.</p>
            </div>
        </header>

        <section class="bp-grid bp-grid--2">
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">Maintenance mode</h2></header>
                <div class="bp-card-body">
                    <label class="bp-toggle-field">
                        <input type="checkbox" />
                        <span class="bp-toggle"></span>
                        <span class="ml-3">Block all non-admin traffic</span>
                    </label>
                    <textarea class="bp-textarea" rows="3" placeholder="Reason shown to users…"></textarea>
                </div>
            </div>
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">Cache</h2></header>
                <div class="bp-card-body bp-card-buttons">
                    <button class="bp-button">Clear config</button>
                    <button class="bp-button">Clear views</button>
                    <button class="bp-button">Clear routes</button>
                    <button class="bp-button">Clear all</button>
                </div>
            </div>
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">Queues</h2></header>
                <div class="bp-card-body">
                    <ul class="bp-list">
                        <li>Failed jobs · <strong>3</strong></li>
                        <li>Pending · <strong>0</strong></li>
                        <li>Longest wait · <strong>0s</strong></li>
                    </ul>
                    <button class="bp-button">Retry failed</button>
                </div>
            </div>
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">Sessions</h2></header>
                <div class="bp-card-body">
                    <p>Currently active sessions across the panel.</p>
                    <button class="bp-button bp-button--danger">Terminate all</button>
                </div>
            </div>
        </section>
    </div>
@endsection