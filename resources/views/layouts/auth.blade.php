@extends('blueprint::layouts.base')

@section('title', $title ?? 'Sign in')

@section('body')
    <div class="auth-shell">
        <div class="auth-grid-bg" aria-hidden></div>
        <main class="auth-card">
            <header class="mb-6 flex items-center gap-3">
                <img src="{{ asset('images/logo.svg') }}" alt="Logo" class="h-9 w-9">
                <div>
                    <p class="text-base font-semibold">{{ config('app.name') }}</p>
                    <p class="text-xs text-muted-foreground">{{ config('blueprint.tagline') }}</p>
                </div>
            </header>
            @yield('content')
            <footer class="mt-6 text-center text-xs text-muted-foreground">
                &copy; {{ date('Y') }} {{ config('app.name') }}. Crafted with Blueprint.
            </footer>
        </main>
    </div>
@endsection

@push('scripts')
    @vite(['resources/css/auth.css', 'resources/js/auth.tsx'])
@endpush
