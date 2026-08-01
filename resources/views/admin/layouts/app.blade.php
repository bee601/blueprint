@extends('blueprint::layouts.base')

@section('title', trim(View::yieldContent('title'), ' ·') . ' · Admin')

@section('body')
    <div class="app-shell">
        @include('blueprint::admin.partials.sidebar')

        <main class="app-main">
            @include('blueprint::partials.navbar', ['admin' => true])

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
    @vite(['resources/css/admin.css', 'resources/js/admin.tsx'])
@endpush
