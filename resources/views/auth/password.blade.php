@extends('blueprint::layouts.auth')

@section('title', 'Reset password')

@section('content')
    <form method="POST" action="{{ route('auth.password.reset') }}" class="auth-form">
        @csrf
        <h1 class="auth-title">Reset password</h1>
        <p class="auth-subtitle">We'll email you a magic link.</p>
        <div class="bp-field">
            <label class="bp-label">Email</label>
            <input class="bp-input" type="email" name="email" required />
        </div>
        <button class="bp-button bp-button--primary bp-button--block">Send reset link</button>
    </form>
@endsection