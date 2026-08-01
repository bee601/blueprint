@extends('blueprint::layouts.app')

@section('title', 'Server error')

@section('content')
    <div class="page page-error">
        <div class="bp-card error-card">
            <div class="bp-card-body">
                <h1 class="error-code">500</h1>
                <p class="error-message">Something went wrong on our end.</p>
                <a href="{{ url('/') }}" class="bp-button bp-button--primary">Go home</a>
            </div>
        </div>
    </div>
@endsection