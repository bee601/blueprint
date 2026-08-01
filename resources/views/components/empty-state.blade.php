@props([
    'title',
    'description' => null,
    'icon' => 'circle',
    'actionLabel' => null,
    'actionUrl' => null,
])

<div class="bp-empty-state">
    <div class="bp-empty-state-icon">
        <x-icon :name="$icon" class="h-6 w-6" />
    </div>
    <h3 class="bp-empty-state-title">{{ $title }}</h3>
    @if ($description)
        <p class="bp-empty-state-description">{{ $description }}</p>
    @endif
    @if ($actionLabel && $actionUrl)
        <a href="{{ $actionUrl }}" class="bp-button bp-button--primary">{{ $actionLabel }}</a>
    @elseif ($actionLabel)
        <button class="bp-button bp-button--primary">{{ $actionLabel }}</button>
    @endif
    {{ $slot }}
</div>
