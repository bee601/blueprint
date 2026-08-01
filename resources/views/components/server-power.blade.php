@props(['server', 'compact' => false])

<div class="bp-server-power">
    <button class="bp-button {{ $compact ? '' : 'bp-button--success' }}" data-action="server-start" data-server="{{ $server->uuid }}">
        <x-icon name="activity" class="h-4 w-4" />
        <span>Start</span>
    </button>
    <button class="bp-button" data-action="server-restart" data-server="{{ $server->uuid }}">
        <x-icon name="activity" class="h-4 w-4" />
        <span>Restart</span>
    </button>
    <button class="bp-button bp-button--warning" data-action="server-stop" data-server="{{ $server->uuid }}">
        <x-icon name="circle" class="h-4 w-4" />
        <span>Stop</span>
    </button>
    <button class="bp-button bp-button--danger" data-action="server-kill" data-server="{{ $server->uuid }}">
        <x-icon name="circle" class="h-4 w-4" />
        <span>Kill</span>
    </button>
</div>
