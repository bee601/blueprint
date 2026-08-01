@props([
    'variant' => 'primary',
    'type' => 'button',
])

@php
    $classes = ['bp-button', 'bp-button--' . $variant];
@endphp

<button type="{{ $type }}" {{ $attributes->class(implode(' ', $classes)) }}>
    {{ $slot }}
</button>
