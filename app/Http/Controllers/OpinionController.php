<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Opinion;


class OpinionController extends Controller
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
    public function store(Request $request)
    {
        // Validación de los datos recibidos
        $data = $request->validate([
            'name' => 'nullable|string|max:255', // El nombre es opcional, máximo 255 caracteres
            'email' => 'nullable|email|max:255', // El email es opcional, debe ser válido y de máximo 255 caracteres
            'message' => 'required|string', // El mensaje es obligatorio
            'rating' => 'nullable|integer|min:1|max:10', // La valoración es opcional, debe ser un número entero entre 1 y 10
        ]);

        // Guarda la opinión en la base de datos
        Opinion::create($data);
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
