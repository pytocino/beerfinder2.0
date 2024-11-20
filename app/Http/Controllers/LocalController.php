<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLocalRequest;
use App\Http\Requests\UpdateLocalRequest;
use App\Http\Resources\BeerResource;
use App\Http\Resources\LocalResource;
use App\Models\Local;
use Illuminate\Http\Request;


class LocalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreLocalRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Local $local, Request $request)
    {
        $name = $request->localName;

        $local = Local::where('name', $name)->firstOrFail();

        $beers = $local->beers()->get();

        return inertia('Local/Show', [
            'local' => new LocalResource($local),
            'beers' => BeerResource::collection($beers)->response()->getData(true),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Local $local)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLocalRequest $request, Local $local)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Local $local)
    {
        //
    }
}
