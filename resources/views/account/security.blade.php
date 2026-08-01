@extends('blueprint::layouts.app')

@section('title', 'Security')

@section('content')
    <div class="page page-account-security">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Security</h1>
                <p class="page-description">Authentication, password and 2FA settings.</p>
            </div>
        </header>

        <section class="bp-grid bp-grid--2">
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">Change password</h2></header>
                <div class="bp-card-body">
                    <form method="POST" action="{{ url('/account/password') }}" class="account-form">
                        @csrf
                        <div class="bp-field">
                            <label class="bp-label">Current password</label>
                            <input class="bp-input" type="password" name="current" />
                        </div>
                        <div class="bp-field">
                            <label class="bp-label">New password</label>
                            <input class="bp-input" type="password" name="password" />
                        </div>
                        <div class="bp-field">
                            <label class="bp-label">Confirm</label>
                            <input class="bp-input" type="password" name="password_confirmation" />
                        </div>
                        <button class="bp-button bp-button--primary">Update password</button>
                    </form>
                </div>
            </div>
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">Two-factor authentication</h2></header>
                <div class="bp-card-body">
                    <p>Add a second factor to your account with TOTP.</p>
                    <button class="bp-button bp-button--primary">Enable 2FA</button>
                </div>
            </div>
            <div class="bp-card span-2">
                <header class="bp-card-header"><h2 class="bp-card-title">Sessions</h2></header>
                <div class="bp-card-body">
                    <ul class="sessions-list">
                        @foreach (($sessions ?? []) as $session)
                            <li>
                                <div>
                                    <p class="sessions-device">{{ $session['device'] }}</p>
                                    <p class="sessions-meta">{{ $session['ip'] }} · {{ $session['location'] }} · {{ $session['last_active'] }}</p>
                                </div>
                                <button class="bp-button bp-button--ghost bp-button--danger">Sign out</button>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </section>
    </div>
@endsection
