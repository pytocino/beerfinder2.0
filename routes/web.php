<?php

use App\Http\Controllers\BeerController;
use App\Http\Controllers\BeerLocalController;
use App\Http\Controllers\BeerRatingController;
use App\Http\Controllers\LocalController;
use App\Http\Controllers\LocalRatingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [BeerController::class, 'index'])->name('beers');

Route::get('/beerlocals', [BeerLocalController::class, 'index'])->name('beerlocals.index');
Route::get('/beerlocals/locals/{localName}', [LocalController::class, 'show'])->name('local.show');

Route::post('/beer-ratings', [BeerRatingController::class, 'store']);
Route::post('/local-ratings', [LocalRatingController::class, 'store']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('perfil', ProfileController::class);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
