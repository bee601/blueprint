@extends('blueprint::layouts.app')

@section('title', $server->name . ' · Startup')

@section('content')
    <div class="page page-server-startup">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Startup</h1>
                <p class="page-description">Service configuration and runtime variables.</p>
            </div>
        </header>

        <section class="bp-grid bp-grid--2">
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">Startup command</h2></header>
                <div class="bp-card-body">
                    <pre class="code-block">{{ $server->startup }}</pre>
                </div>
            </div>
            <div class="bp-card">
                <header class="bp-card-header"><h2 class="bp-card-title">Variables</h2></header>
                <div class="bp-card-body">
                    <form method="POST" action="{{ route('server.startup.update', $server) }}" class="server-variables">
                        @csrf
                        @foreach (($variables ?? []) as $variable)
                            <div class="bp-field">
                                <label class="bp-label">{{ $variable->name }}</label>
                                <input class="bp-input" name="env[{{ $variable->env_variable }}]" value="{{ $variable->server_value ?? $variable->default_value }}" />
                                @if ($variable->rules)
                                    <p class="bp-field-hint">{{ $variable->rules }}</p>
                                @endif
                            </div>
                        @endforeach
                        <button type="submit" class="bp-button bp-button--primary">Save changes</button>
                    </form>
                </div>
            </div>
        </section>
    </div>
@endsection
