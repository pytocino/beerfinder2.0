<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class TranslateController extends Controller
{
    public function translate(Request $request)
    {
        // Validamos los parámetros de entrada
        $request->validate([
            'text' => 'required|string',
            'source' => 'nullable|string',
            'target' => 'required|string',
        ]);

        // Extraemos los parámetros
        $text = $request->input('text');
        $source = $request->input('source', 'auto');  // Si no se especifica, se usa 'auto' (auto-detect)
        $target = $request->input('target');

        // Creamos una instancia del cliente Guzzle
        $client = new Client();

        try {
            // Enviamos la solicitud POST a FastAPI (asegurándote de que la URL esté correcta)
            $response = $client->post('http://127.0.0.1:8000/api/translate', [
                'json' => [
                    'text' => $text,
                    'source' => $source,
                    'target' => $target,
                ]
            ]);

            // Obtenemos el cuerpo de la respuesta
            $body = json_decode($response->getBody()->getContents(), true);

            // Devolvemos la traducción
            return response()->json([
                'translated_text' => $body['translated_text'] ?? $text,
            ]);
        } catch (\Exception $e) {
            // Si ocurre algún error, devolvemos el texto original
            return response()->json([
                'translated_text' => $text,
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
