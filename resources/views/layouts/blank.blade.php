@extends('blueprint::layouts.base')

@section('title', $title ?? '')
@section('body')
    <main class="min-h-screen bg-background text-foreground">
        @yield('content')
    </main>
@endsection
