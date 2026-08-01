@extends('blueprint::layouts.base')

@section('title', $title ?? 'Dashboard')

@section('body')
    <div class="app-shell" id="blueprint-app">
        @include('blueprint::partials.sidebar')

        <main class="app-main">
            @include('blueprint::partials.navbar')

            <div class="page-container">
                @yield('content')
            </div>

            @include('blueprint::partials.footer')
        </main>
    </div>

    @include('blueprint::partials.command-palette')
    @include('blueprint::partials.toaster')
@endsection

@push('scripts')
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
@endpush
