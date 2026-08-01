@extends('blueprint::layouts.app')

@section('title', 'Maintenance')

@section('content')
    <div class="page page-error">
        <div class="bp-card error-card">
            <div class="bp-card-body">
                <h1 class="error-code"><x-icon name="wrench" class="h-12 w-12" /></h1>
                <p class="error-message">{{ config('blueprint.maintenance.message', 'Be right back.') }}</p>
            </div>
        </div>
    </div>
@endsection