<?php

namespace App\Http\Controllers;

use App\Models\Beer;
use App\Models\BeerRating;
use Illuminate\Http\Request;

class BeerRatingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'beer_id' => 'required|exists:beers,id',
            'rating' => 'required|numeric|min:0|max:5',
            'comment' => 'nullable|string',
        ]);

        BeerRating::create([
            'beer_id' => $request->beer_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        // Actualizar el rating promedio
        $beer = Beer::find($request->beer_id);
        $beer->rating = $beer->ratings()->avg('rating');
        $beer->save();

        return redirect()->back()->with('success', 'Calificación guardada con éxito');
    }
}
