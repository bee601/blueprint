@props(['setting'])
@php
    /** @var array $setting */
    $type = $setting['type'] ?? 'text';
    $name = "settings[{$setting['key']}]";
@endphp

<div class="bp-field setting-field setting-field--{{ $type }}">
    <label class="bp-label">
        <span>{{ $setting['label'] }}</span>
        @if (!empty($setting['advanced']))
            <span class="bp-badge bp-badge--muted">Advanced</span>
        @endif
    </label>
    @if (!empty($setting['description']))
        <p class="bp-field-hint">{{ $setting['description'] }}</p>
    @endif

    @switch($type)
        @case('boolean')
            <label class="bp-toggle-field">
                <input type="checkbox" name="{{ $name }}" value="1" @checked($setting['value'] ?? $setting['default'] ?? false) />
                <span class="bp-toggle"></span>
            </label>
            @break

        @case('select')
            <select class="bp-select" name="{{ $name }}">
                @foreach (($setting['options'] ?? []) as $value => $label)
                    <option value="{{ $value }}" @selected(($setting['value'] ?? null) === $value)>{{ $label }}</option>
                @endforeach
            </select>
            @break

        @case('range')
            <input class="bp-input bp-range" type="range" name="{{ $name }}" min="{{ $setting['min'] ?? 0 }}" max="{{ $setting['max'] ?? 100 }}" value="{{ $setting['value'] ?? $setting['default'] ?? 0 }}" />
            <span class="setting-value">{{ $setting['value'] ?? $setting['default'] ?? 0 }}</span>
            @break

        @case('color')
            <div class="bp-color-field">
                <input type="color" name="{{ $name }}_color" value="{{ $setting['value'] ?? $setting['default'] ?? '#000000' }}" />
                <input type="text" class="bp-input" name="{{ $name }}" value="{{ $setting['value'] ?? $setting['default'] ?? '' }}" />
            </div>
            @break

        @case('textarea')
            <textarea class="bp-textarea" name="{{ $name }}" rows="{{ $setting['rows'] ?? 4 }}">{{ $setting['value'] ?? $setting['default'] ?? '' }}</textarea>
            @break

        @case('json')
            <textarea class="bp-textarea font-mono" name="{{ $name }}" rows="6">{{ json_encode($setting['value'] ?? $setting['default'] ?? [], JSON_PRETTY_PRINT) }}</textarea>
            @break

        @default
            <input class="bp-input" type="{{ $setting['input_type'] ?? 'text' }}" name="{{ $name }}" value="{{ $setting['value'] ?? $setting['default'] ?? '' }}" />
    @endswitch
</div>