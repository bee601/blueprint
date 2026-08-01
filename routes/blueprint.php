<?php

declare(strict_types=1);

use Blueprint\Theme\Http\Controllers\SettingsController;
use Illuminate\Support\Facades\Route;

Route::get('/manifest', [SettingsController::class, 'manifest'])->name('blueprint.api.manifest');
Route::get('/resolved', [SettingsController::class, 'resolved'])->name('blueprint.api.resolved');
Route::post('/settings', [SettingsController::class, 'update'])->name('blueprint.api.update');
Route::post('/settings/reset', [SettingsController::class, 'reset'])->name('blueprint.api.reset');
