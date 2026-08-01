@extends('blueprint::layouts.app')

@section('title', 'Access denied')

@section('content')
    <div class="page page-error">
        <div class="bp-card error-card">
            <div class="bp-card-body">
                <h1 class="error-code">403</h1>
                <p class="error-message">You don't have permission to access this resource.</p>
                <a href="{{ url('/') }}" class="bp-button bp-button--primary">Go home</a>
            </div>
        </div>
    </div>
@endsection