@extends('blueprint::layouts.auth')

@section('title', 'Register')

@section('content')
    <form method="POST" action="{{ route('auth.register') }}" class="auth-form">
        @csrf
        <h1 class="auth-title">Create account</h1>
        <p class="auth-subtitle">Get started with Blueprint in a few seconds.</p>

        <div class="bp-grid bp-grid--2">
            <div class="bp-field">
                <label class="bp-label">First name</label>
                <input class="bp-input" name="name_first" required />
            </div>
            <div class="bp-field">
                <label class="bp-label">Last name</label>
                <input class="bp-input" name="name_last" required />
            </div>
        </div>
        <div class="bp-field">
            <label class="bp-label">Email</label>
            <input class="bp-input" name="email" type="email" required />
        </div>
        <div class="bp-field">
            <label class="bp-label">Username</label>
            <input class="bp-input" name="username" required />
        </div>
        <div class="bp-field">
            <label class="bp-label">Password</label>
            <input class="bp-input" name="password" type="password" required />
        </div>
        <button class="bp-button bp-button--primary bp-button--block">Create account</button>
        <p class="auth-foot">Already have an account? <a href="{{ route('auth.login') }}">Sign in</a></p>
    </form>
@endsection
