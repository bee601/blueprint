@extends('blueprint::layouts.app')

@section('title', 'Account')

@section('content')
    <div class="page page-account">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Account</h1>
                <p class="page-description">Manage your profile, security and API keys.</p>
            </div>
        </header>

        <nav class="bp-tabs account-tabs">
            <a href="{{ url('/account') }}" class="bp-tab is-active">Profile</a>
            <a href="{{ url('/account/security') }}" class="bp-tab">Security</a>
            <a href="{{ url('/account/api') }}" class="bp-tab">API keys</a>
            <a href="{{ url('/account/ssh') }}" class="bp-tab">SSH keys</a>
            <a href="{{ url('/account/oauth') }}" class="bp-tab">Connected accounts</a>
        </nav>

        <section class="bp-grid bp-grid--3">
            <div class="bp-card span-2">
                <header class="bp-card-header">
                    <h2 class="bp-card-title">Profile</h2>
                </header>
                <div class="bp-card-body">
                    <form method="POST" action="{{ url('/account/profile') }}" class="account-form">
                        @csrf
                        <div class="bp-grid bp-grid--2">
                            <div class="bp-field">
                                <label class="bp-label">First name</label>
                                <input class="bp-input" name="name_first" value="{{ auth()->user()->name_first ?? '' }}" />
                            </div>
                            <div class="bp-field">
                                <label class="bp-label">Last name</label>
                                <input class="bp-input" name="name_last" value="{{ auth()->user()->name_last ?? '' }}" />
                            </div>
                            <div class="bp-field span-2">
                                <label class="bp-label">Email</label>
                                <input class="bp-input" name="email" type="email" value="{{ auth()->user()->email ?? '' }}" />
                            </div>
                            <div class="bp-field span-2">
                                <label class="bp-label">Username</label>
                                <input class="bp-input" name="username" value="{{ auth()->user()->username ?? '' }}" />
                            </div>
                        </div>
                        <button class="bp-button bp-button--primary">Save changes</button>
                    </form>
                </div>
            </div>
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">Identity</h2></header>
                <div class="bp-card-body account-avatar-card">
                    <div class="account-avatar">
                        <img src="https://api.dicebear.com/9.x/initials/svg?seed={{ urlencode(auth()->user()->username) }}" alt="" />
                    </div>
                    <button class="bp-button">Upload new avatar</button>
                    <button class="bp-button bp-button--ghost">Reset</button>
                </div>
            </div>
        </section>
    </div>
@endsection
