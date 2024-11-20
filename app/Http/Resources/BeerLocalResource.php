<?php

namespace App\Http\Resources;

use App\Models\Beer;
use App\Models\Local;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BeerLocalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'beer_id' => new BeerResource($this->beer),
            'local_id' => new LocalResource($this->local),
        ];
    }
}
