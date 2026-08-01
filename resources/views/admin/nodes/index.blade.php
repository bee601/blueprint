@extends('blueprint::admin.layouts.app')

@section('title', 'Admin · Nodes')

@section('content')
    <div class="page page-admin-nodes">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Nodes</h1>
                <p class="page-description">Physical hosts running your workloads.</p>
            </div>
            <div class="page-header-actions">
                <a href="{{ url('/admin/nodes/new') }}" class="bp-button bp-button--primary">Create node</a>
            </div>
        </header>

        <section class="bp-grid bp-grid--2">
            @foreach (($nodes ?? []) as $node)
                @include('blueprint::admin.partials.node-card', ['node' => $node])
            @endforeach
        </section>
    </div>
@endsection