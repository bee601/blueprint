<!DOCTYPE html>
<html lang="en" data-theme="{{ config('blueprint.mode') }}" data-theme-preset="{{ config('blueprint.theme') }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="theme-color" content="{{ config('blueprint.primary_color') }}">
    <meta name="description" content="{{ config('blueprint.tagline') ?? 'A premium Pterodactyl experience.' }}">
    <title>@yield('title', config('app.name'))</title>
    @stack('head')

    <link rel="icon" href="{{ asset('images/favicon.svg') }}" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

    @blueprintCss
    @blueprintConfig
    @blueprintManifest
</head>
<body class="bg-background text-foreground antialiased">
    @yield('body')
    @stack('scripts')
</body>
</html>
