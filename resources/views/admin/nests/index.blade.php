@extends('blueprint::admin.layouts.app')

@section('title', 'Admin · Nests')

@section('content')
    <div class="page page-admin-nests">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Nests</h1>
                <p class="page-description">Top-level service categories.</p>
            </div>
            <div class="page-header-actions">
                <button class="bp-button bp-button--primary">New nest</button>
            </div>
        </header>

        <section class="bp-grid bp-grid--3">
            @foreach (($nests ?? []) as $nest)
                <div class="bp-card">
                    <header class="bp-card-header">
                        <h2 class="bp-card-title">{{ $nest->name }}</h2>
                        <p class="bp-card-meta">{{ $nest->description }}</p>
                    </header>
                    <div class="bp-card-body">
                        <p>Eggs: {{ $nest->eggs_count ?? 0 }}</p>
                        <a href="{{ route('admin.eggs.index', $nest) }}" class="bp-button bp-button--ghost">Manage eggs →</a>
                    </div>
                </div>
            @endforeach
        </section>
    </div>
@endsection