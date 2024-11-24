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
use App\Http\Controllers\OpinionController;

Route::resource('/opinions', OpinionController::class)->only(['store']);
Route::get('/set-dev', function () {
    cookie()->queue('developer', true, 60); // Cookie válida por 60 minutos
    return redirect('/');
});

Route::get('/', function () {
    if (!app()->environment('production')) {
        // Verifica si la cookie está presente
        if (request()->cookie('developer')) {
            return resolve(App\Http\Controllers\BeerController::class)->index();
        }

        // Caso contrario, muestra la página "Coming Soon"
        return view('coming-soon');
    }

    return resolve(App\Http\Controllers\BeerController::class)->index();
})->name('home');





// Route::get('/', function () {
//     if (app()->environment('production')) {
//         return app()->call([App\Http\Controllers\BeerController::class, 'index']);
//     } else {
//         return view('coming-soon');
//     }
// })->name('home');


// Route::get('/', function () {
//     // Comprobar si estamos en modo de mantenimiento o en un entorno específico
//     if (!app()->environment('production')) {
//         // Si está en producción, muestra la vista "coming-soon"
//         return view('coming-soon');
//     }

//     // Si no es producción, llama a BeerController
//     return redirect()->route('beers');
// });
// Route::get('/', [BeerController::class, 'index'])->name('beers');

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
