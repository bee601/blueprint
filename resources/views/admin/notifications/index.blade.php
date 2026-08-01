@extends('blueprint::admin.layouts.app')

@section('title', 'Admin · Notifications')

@section('content')
    <div class="page page-admin-notifications">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Notifications</h1>
                <p class="page-description">Send announcements to your users.</p>
            </div>
        </header>

        <section class="bp-grid bp-grid--2">
            <div class="bp-card span-2">
                <header class="bp-card-header"><h2 class="bp-card-title">New announcement</h2></header>
                <div class="bp-card-body">
                    <form class="bp-form">
                        <div class="bp-field">
                            <label class="bp-label">Title</label>
                            <input class="bp-input" />
                        </div>
                        <div class="bp-field">
                            <label class="bp-label">Message</label>
                            <textarea class="bp-textarea" rows="4"></textarea>
                        </div>
                        <div class="bp-grid bp-grid--3">
                            <label class="bp-toggle-field"><input type="checkbox" /><span class="bp-toggle"></span> Email</label>
                            <label class="bp-toggle-field"><input type="checkbox" /><span class="bp-toggle"></span> Toast</label>
                            <label class="bp-toggle-field"><input type="checkbox" /><span class="bp-toggle"></span> Discord webhook</label>
                        </div>
                        <button class="bp-button bp-button--primary">Send</button>
                    </form>
                </div>
            </div>
            <div class="bp-card span-2">
                <header class="bp-card-header"><h2 class="bp-card-title">History</h2></header>
                <div class="bp-card-body">
                    <ul class="activity-feed">
                        @foreach (($notifications ?? []) as $notification)
                            <li class="activity-feed-item">
                                <span class="activity-feed-dot info"></span>
                                <div>
                                    <p class="activity-feed-title">{{ $notification['title'] }}</p>
                                    <p class="activity-feed-meta">{{ $notification['meta'] }}</p>
                                </div>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </section>
    </div>
@endsection