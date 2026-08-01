@extends('blueprint::admin.layouts.app')

@section('title', 'Admin · Locations')

@section('content')
    <div class="page page-admin-locations">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Locations</h1>
                <p class="page-description">Geographic groupings of nodes.</p>
            </div>
            <div class="page-header-actions">
                <button class="bp-button bp-button--primary">New location</button>
            </div>
        </header>

        <section class="bp-card">
            <table class="bp-table">
                <thead>
                    <tr><th>Short</th><th>Description</th><th>Nodes</th><th></th></tr>
                </thead>
                <tbody>
                    @foreach (($locations ?? []) as $location)
                        <tr>
                            <td><span class="bp-badge">{{ $location->short }}</span></td>
                            <td>{{ $location->long }}</td>
                            <td>{{ $location->nodes_count ?? 0 }}</td>
                            <td>
                                <button class="bp-button bp-button--ghost">Edit</button>
                                <button class="bp-button bp-button--ghost bp-button--danger">Delete</button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </section>
    </div>
@endsection