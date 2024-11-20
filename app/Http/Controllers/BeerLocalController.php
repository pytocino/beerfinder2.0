<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBeerLocalRequest;
use App\Http\Requests\UpdateBeerLocalRequest;
use App\Http\Resources\BeerLocalResource;
use App\Http\Resources\BeerResource;
use App\Http\Resources\LocalResource;
use App\Models\Beer;
use App\Models\BeerLocal;
use Illuminate\Http\Request;

class BeerLocalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $name = $request->name;

        // Find the beer by name, or throw a 404 error if not found
        $beer = Beer::where('name', $name)->firstOrFail();

        // Get the locals that serve this beer and paginate the results (10 per page)
        $locals = $beer->locals()->paginate(10);

        // Return the data to the 'BeerLocals/Index' component using Inertia
        return inertia('BeerLocals/Index', [
            'beer' => new BeerResource($beer),
            'locals' => LocalResource::collection($locals)->response()->getData(true),
            'name' => $name,  // Pasar el parámetro 'name' a la vista
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
    public function store(StoreBeerLocalRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(BeerLocal $beerLocal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BeerLocal $beerLocal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBeerLocalRequest $request, BeerLocal $beerLocal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BeerLocal $beerLocal)
    {
        //
    }
}
