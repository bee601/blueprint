@extends('blueprint::admin.layouts.app')

@section('title', 'Admin · Security')

@section('content')
    <div class="page page-admin-security">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Security center</h1>
                <p class="page-description">2FA enforcement, IP allowlists and intrusion detection.</p>
            </div>
        </header>

        <section class="bp-grid bp-grid--2">
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">Two-factor enforcement</h2></header>
                <div class="bp-card-body">
                    <p>{{ $security['without_2fa'] ?? 0 }} users have not enabled 2FA.</p>
                    <button class="bp-button bp-button--primary">Require 2FA globally</button>
                </div>
            </div>
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">IP allowlist</h2></header>
                <div class="bp-card-body">
                    <textarea class="bp-textarea font-mono" rows="6">10.0.0.0/8
192.168.0.0/16</textarea>
                    <button class="bp-button">Save</button>
                </div>
            </div>
            <div class="bp-card span-2">
                <header class="bp-card-header"><h2 class="bp-card-title">Recent suspicious events</h2></header>
                <div class="bp-card-body">
                    <ul class="activity-feed">
                        @foreach (($suspicious ?? []) as $event)
                            <li class="activity-feed-item">
                                <span class="activity-feed-dot danger"></span>
                                <div>
                                    <p class="activity-feed-title">{{ $event['title'] }}</p>
                                    <p class="activity-feed-meta">{{ $event['meta'] }}</p>
                                </div>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </section>
    </div>
@endsection