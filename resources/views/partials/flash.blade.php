@if (session('status'))
    <div class="bp-alert bp-alert--success">
        <p>{{ session('status') }}</p>
    </div>
@endif