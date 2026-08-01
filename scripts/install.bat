@echo off
REM Blueprint theme installer (Windows).
setlocal enabledelayedexpansion
echo Installing Blueprint dependencies...
call composer install --no-dev --optimize-autoloader
call npm ci
call npm run build
call php artisan blueprint:publish-assets
echo Done.
