@extends('blueprint::layouts.app')

@section('title', 'Page not found')

@section('content')
    <div class="page page-error">
        <div class="bp-card error-card">
            <div class="bp-card-body">
                <h1 class="error-code">404</h1>
                <p class="error-message">The page you're looking for can't be found.</p>
                <a href="{{ url('/') }}" class="bp-button bp-button--primary">Go home</a>
            </div>
        </div>
    </div>
@endsection