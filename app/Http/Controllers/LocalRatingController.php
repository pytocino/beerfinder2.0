<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLocalRatingRequest;
use App\Models\Local;
use App\Models\LocalRating;

class LocalRatingController extends Controller
{
    public function store(StoreLocalRatingRequest $request)
    {
        $request->validate([
            'local_id' => 'required|exists:local,id',
            'rating' => 'required|numeric|min:0|max:5',
            'comment' => 'nullable|string',
        ]);

        LocalRating::create([
            'local_id' => $request->input('local_id'),
            'rating' => $request->input('rating'),
            'comment' => $request->input('comment'),
        ]);

        // Actualizar el rating promedio
        $local = Local::find($request->input('local_id'));
        $local->rating = $local->ratings()->avg('rating');
        $local->save();

        // Si se ha guardado correctamente, redirigir al local con un mensaje de éxito
        return redirect()->route('local.show', ['localName' => $local->name])->with('success', 'Rating guardado con éxito');
    }
}
