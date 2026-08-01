<nav aria-label="Breadcrumb" class="layout-breadcrumb">
    <ol class="breadcrumb-list">
        @foreach ($items as $item)
            <li class="breadcrumb-item">
                @if (! $loop->last && ! empty($item['href']))
                    <a href="{{ $item['href'] }}" class="breadcrumb-link">{{ $item['label'] }}</a>
                    <x-icon name="chevron-right" class="breadcrumb-separator" />
                @else
                    <span class="breadcrumb-current">{{ $item['label'] }}</span>
                @endif
            </li>
        @endforeach
    </ol>
</nav>