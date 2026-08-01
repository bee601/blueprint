@extends('blueprint::admin.layouts.app')

@section('title', 'Admin · Theme')

@section('content')
    <div class="page page-admin-themes">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Theme manager</h1>
                <p class="page-description">Switch between presets, configure accents, and ship your own CSS.</p>
            </div>
            <div class="page-header-actions">
                <button class="bp-button bp-button--ghost">Export theme</button>
                <button class="bp-button bp-button--primary">Save</button>
            </div>
        </header>

        <section class="bp-grid bp-grid--3">
            @foreach (($presets ?? []) as $preset)
                <label class="bp-card theme-preset {{ ($current ?? '') === $preset['name'] ? 'is-active' : '' }}">
                    <header class="bp-card-header">
                        <h2 class="bp-card-title">{{ $preset['label'] }}</h2>
                        <span class="bp-status-indicator {{ $preset['name'] === ($current ?? '') ? 'online' : 'offline' }}"></span>
                    </header>
                    <div class="bp-card-body">
                        <div class="theme-preset-swatches">
                            @foreach (array_slice($preset['tokens'] ?? [], 0, 6) as $token => $value)
                                <span class="theme-preset-swatch" style="background: rgb({{ $value }})"></span>
                            @endforeach
                        </div>
                        <p class="theme-preset-description">{{ $preset['description'] ?? '' }}</p>
                        <input type="radio" name="theme.preset" value="{{ $preset['name'] }}" @checked(($current ?? '') === $preset['name']) />
                    </div>
                </label>
            @endforeach
        </section>

        <section class="bp-card">
            <header class="bp-card-header"><h2 class="bp-card-title">Custom CSS</h2></header>
            <div class="bp-card-body">
                <textarea class="bp-textarea font-mono" rows="10">/* Override Blueprint variables here */&#10;:root {&#10;  --primary: 124 92 250;&#10;}</textarea>
            </div>
        </section>
    </div>
@endsection