@extends('blueprint::layouts.auth')

@section('title', 'Sign in')

@section('content')
    <form method="POST" action="{{ route('auth.login') }}" class="auth-form">
        @csrf
        <h1 class="auth-title">Welcome back</h1>
        <p class="auth-subtitle">Sign in to your Blueprint dashboard.</p>

        @if ($errors->any())
            <div class="bp-alert bp-alert--danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="bp-field">
            <label class="bp-label">Email or username</label>
            <input class="bp-input" name="user" autofocus required />
        </div>
        <div class="bp-field">
            <label class="bp-label">
                <span>Password</span>
                <a href="{{ route('auth.password') }}" class="bp-field-link">Forgot?</a>
            </label>
            <input class="bp-input" name="password" type="password" required />
        </div>
        <button type="submit" class="bp-button bp-button--primary bp-button--block">Sign in</button>

        @if (config('blueprint.auth.allow_registration'))
            <p class="auth-foot">
                No account? <a href="{{ route('auth.register') }}">Create one</a>
            </p>
        @endif
    </form>
@endsection
