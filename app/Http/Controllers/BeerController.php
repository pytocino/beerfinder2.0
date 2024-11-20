<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBeerRequest;
use App\Http\Requests\UpdateBeerRequest;
use App\Http\Resources\BeerResource;
use App\Models\Beer;
use Illuminate\Support\Facades\DB;

class BeerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtener tipos de cerveza únicos
        $types = DB::table('beers')->distinct()->pluck('type');

        // Obtener todas las cervezas (o 10 cervezas aleatorias)
        $beers = Beer::all();

        return inertia('Welcome', [
            'beers' => BeerResource::collection($beers),
            'types' => $types, // Enviar tipos de cerveza únicos al frontend
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBeerRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Beer $beer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Beer $beer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBeerRequest $request, Beer $beer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Beer $beer)
    {
        //
    }
}
