@extends('blueprint::layouts.app')

@section('title', 'Create server')

@section('content')
    <div class="page page-server-new">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Create a server</h1>
                <p class="page-description">Step {{ $step ?? 1 }} of 4 — {{ $step_label ?? 'Egg' }}</p>
            </div>
        </header>

        <div class="bp-card">
            <div class="bp-card-body">
                <ol class="wizard-steps">
                    <li class="is-active">Egg</li>
                    <li>Location</li>
                    <li>Resources</li>
                    <li>Review</li>
                </ol>
                <div class="wizard-body">
                    @yield('wizard')
                </div>
                <div class="wizard-actions">
                    <a class="bp-button bp-button--ghost" href="{{ url('/servers') }}">Cancel</a>
                    <button class="bp-button bp-button--primary">Continue</button>
                </div>
            </div>
        </div>
    </div>
@endsection
