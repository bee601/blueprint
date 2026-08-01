@props([
    'label',
    'value',
    'delta' => null,
    'sub' => null,
    'icon' => null,
    'trend' => null,
])

<div class="bp-stat-card">
    <div class="bp-stat-card-header">
        <span class="bp-stat-card-label">{{ $label }}</span>
        @if ($icon)
            <span class="bp-stat-card-icon">
                <x-icon :name="$icon" class="h-4 w-4" />
            </span>
        @endif
    </div>
    <div class="bp-stat-card-value">{{ $value }}</div>
    <div class="bp-stat-card-meta">
        @if ($delta)
            <span class="bp-stat-card-delta {{ $trend === 'up' ? 'is-up' : ($trend === 'down' ? 'is-down' : '') }}">
                {{ $delta }}
            </span>
        @endif
        @if ($sub)
            <span class="bp-stat-card-sub">{{ $sub }}</span>
        @endif
    </div>
</div>
