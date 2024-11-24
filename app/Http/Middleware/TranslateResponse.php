<?php

namespace App\Http\Middleware;

use Closure;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class TranslateResponse
{
    public function handle(Request $request, Closure $next)
    {
        // Llamamos al siguiente middleware o al controlador
        $response = $next($request);

        // Verificamos si la respuesta es JSON
        if ($response->headers->get('Content-Type') === 'application/json') {
            // Obtenemos el cuerpo de la respuesta
            $content = json_decode($response->getContent(), true);

            // Traducir cada valor del array
            foreach ($content as $key => $value) {
                if (is_string($value)) {
                    // Llamar al servicio de traducción (función que definimos antes)
                    $content[$key] = $this->traducirTexto($value);
                }
            }

            // Devolvemos la respuesta con los datos traducidos
            $response->setContent(json_encode($content));
        }

        return $response;
    }

    // Función que llama al servicio de traducción
    private function traducirTexto($texto, $src = 'auto', $dest = 'es')
    {
        $client = new Client();
        try {
            $response = $client->post('http://127.0.0.1:8000/api/translate/', [
                'json' => [
                    'text' => $texto,
                    'source' => $src,
                    'target' => $dest,
                ]
            ]);

            $body = json_decode($response->getBody()->getContents(), true);
            return $body['translated_text'] ?? $texto;
        } catch (\Exception $e) {
            return $texto;  // Si hay error, devolvemos el texto original
        }
    }
}
