@extends('blueprint::layouts.auth')

@section('title', 'Two-factor authentication')

@section('content')
    <form method="POST" action="{{ route('auth.two-factor') }}" class="auth-form">
        @csrf
        <h1 class="auth-title">Two-factor authentication</h1>
        <p class="auth-subtitle">Enter the 6-digit code from your authenticator app.</p>
        <div class="bp-field">
            <label class="bp-label">Authentication code</label>
            <input class="bp-input text-center tracking-widest" inputmode="numeric" pattern="[0-9]*" name="code" autofocus />
        </div>
        <button class="bp-button bp-button--primary bp-button--block">Verify</button>
    </form>
@endsection