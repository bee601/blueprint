@extends('blueprint::admin.layouts.app')

@section('title', 'Admin · Settings')

@section('content')
    <div class="page page-admin-settings">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Settings</h1>
                <p class="page-description">Theme, branding, integrations and security.</p>
            </div>
            <div class="page-header-actions">
                <button class="bp-button bp-button--ghost">Reset to defaults</button>
                <button class="bp-button bp-button--primary">Save changes</button>
            </div>
        </header>

        <div class="settings-shell">
            <aside class="settings-nav">
                @foreach (($categories ?? []) as $cat)
                    <a href="#settings-{{ $cat['key'] }}" class="settings-nav-link">{{ $cat['label'] }}</a>
                @endforeach
            </aside>
            <div class="settings-content">
                @foreach (($categories ?? []) as $cat)
                    <section id="settings-{{ $cat['key'] }}" class="settings-section">
                        <h2 class="settings-section-title">{{ $cat['label'] }}</h2>
                        <p class="settings-section-description">{{ $cat['description'] ?? '' }}</p>
                        <div class="settings-grid">
                            @foreach (($cat['settings'] ?? []) as $setting)
                                <x-setting-field :setting="$setting" />
                            @endforeach
                        </div>
                    </section>
                @endforeach
            </div>
        </div>
    </div>
@endsection