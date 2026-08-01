@extends('blueprint::layouts.app')

@section('title', $server->name . ' · Files')

@section('content')
    <div class="page page-server-files">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">File manager</h1>
                <p class="page-description">{{ $server->name }}</p>
            </div>
        </header>

        <section class="bp-card">
            <div class="bp-card-body">
                <div class="file-browser" data-browse-root="{{ $server->uuid }}">
                    <aside class="file-browser-sidebar">
                        <div class="file-browser-breadcrumb" data-breadcrumb>/</div>
                        <ul class="file-browser-tree"></ul>
                    </aside>
                    <div class="file-browser-main">
                        <header class="file-browser-toolbar">
                            <button data-action="back" class="bp-button bp-button--ghost">Back</button>
                            <button data-action="up" class="bp-button bp-button--ghost">Up</button>
                            <button data-action="refresh" class="bp-button bp-button--ghost">Refresh</button>
                            <div class="file-browser-spacer"></div>
                            <button data-action="new-folder" class="bp-button">New folder</button>
                            <button data-action="upload" class="bp-button bp-button--primary">Upload</button>
                        </header>
                        <div class="file-browser-grid" data-grid></div>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection

@push('scripts')
    @vite(['resources/js/files.tsx'])
@endpush
