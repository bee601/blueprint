@if ($paginator->hasPages())
    <nav class="bp-pagination" role="navigation" aria-label="Pagination">
        <ul class="bp-pagination-list">
            @if ($paginator->onFirstPage())
                <li class="bp-pagination-item is-disabled"><span>←</span></li>
            @else
                <li class="bp-pagination-item"><a href="{{ $paginator->previousPageUrl() }}">←</a></li>
            @endif

            @foreach ($elements as $element)
                @if (is_string($element))
                    <li class="bp-pagination-item is-disabled"><span>{{ $element }}</span></li>
                @endif
                @if (is_array($element))
                    @foreach ($element as $page => $url)
                        @if ($page == $paginator->currentPage())
                            <li class="bp-pagination-item is-active"><span>{{ $page }}</span></li>
                        @else
                            <li class="bp-pagination-item"><a href="{{ $url }}">{{ $page }}</a></li>
                        @endif
                    @endforeach
                @endif
            @endforeach

            @if ($paginator->hasMorePages())
                <li class="bp-pagination-item"><a href="{{ $paginator->nextPageUrl() }}">→</a></li>
            @else
                <li class="bp-pagination-item is-disabled"><span>→</span></li>
            @endif
        </ul>
    </nav>
@endif