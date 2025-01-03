<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BeerResource extends JsonResource
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
            'name' => $this->name,
            'color' => $this->color,
            'graduation' => $this->graduation,
            'taste' => $this->taste,
            'type' => $this->type,
            'description' => $this->description,
            'image' => $this->image ?
                (filter_var($this->image, FILTER_VALIDATE_URL) ? $this->image : Storage::url($this->image))
                : null,
            'country' => $this->country,
            'city' => $this->city,
            'region' => $this->region,
            'rating' => $this->rating,
            'user_id' => $this->user_id,
        ];
    }
}
