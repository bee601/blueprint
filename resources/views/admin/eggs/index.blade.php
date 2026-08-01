@extends('blueprint::admin.layouts.app')

@section('title', 'Admin · Eggs')

@section('content')
    <div class="page page-admin-eggs">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Eggs</h1>
                <p class="page-description">Service definitions grouped by nest.</p>
            </div>
        </header>

        <section class="bp-card">
            <table class="bp-table">
                <thead>
                    <tr><th>Name</th><th>Nest</th><th>Author</th><th>Servers</th><th></th></tr>
                </thead>
                <tbody>
                    @foreach (($eggs ?? []) as $egg)
                        <tr>
                            <td><a href="{{ route('admin.eggs.show', $egg) }}">{{ $egg->name }}</a></td>
                            <td>{{ $egg->nest->name ?? '—' }}</td>
                            <td>{{ $egg->author }}</td>
                            <td>{{ $egg->servers_count ?? 0 }}</td>
                            <td><button class="bp-button bp-button--ghost">Edit</button></td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </section>
    </div>
@endsection