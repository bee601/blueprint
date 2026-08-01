@if ($errors->any())
    <div class="bp-alert bp-alert--danger">
        <p class="bp-alert-title">{{ $errors->count() }} error(s) prevented this action.</p>
        <ul class="bp-alert-list">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif