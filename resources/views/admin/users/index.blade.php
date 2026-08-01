@extends('blueprint::admin.layouts.app')

@section('title', 'Admin · Users')

@section('content')
    <div class="page page-admin-users">
        <header class="page-header">
            <div class="page-header-text">
                <h1 class="page-title">Users</h1>
                <p class="page-description">Everyone with access to the panel.</p>
            </div>
            <div class="page-header-actions">
                <a href="{{ url('/admin/users/new') }}" class="bp-button bp-button--primary">New user</a>
            </div>
        </header>

        <div class="page-toolbar">
            <div class="data-table-toolbar">
                <input type="search" class="bp-input" placeholder="Search users…" />
                <select class="bp-select">
                    <option>All roles</option>
                    <option>Admins</option>
                    <option>Members</option>
                    <option>Suspended</option>
                </select>
            </div>
        </div>

        <section class="bp-card">
            <table class="bp-table">
                <thead>
                    <tr><th>User</th><th>Email</th><th>Servers</th><th>Role</th><th>Last seen</th><th></th></tr>
                </thead>
                <tbody>
                    @foreach (($users ?? []) as $user)
                        <tr>
                            <td>
                                <div class="user-cell">
                                    <span class="layout-avatar"><img src="https://api.dicebear.com/9.x/initials/svg?seed={{ urlencode($user->username) }}" alt="" /></span>
                                    <span>{{ $user->name_first }} {{ $user->name_last }}</span>
                                </div>
                            </td>
                            <td>{{ $user->email }}</td>
                            <td>{{ $user->servers_count ?? 0 }}</td>
                            <td>@if ($user->root_admin)<span class="bp-badge bp-badge--primary">Admin</span>@else<span class="bp-badge">Member</span>@endif</td>
                            <td>{{ $user->last_login_at ?? 'Never' }}</td>
                            <td>
                                <button class="bp-button bp-button--ghost">Edit</button>
                                <button class="bp-button bp-button--ghost bp-button--danger">Suspend</button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </section>
    </div>
@endsection