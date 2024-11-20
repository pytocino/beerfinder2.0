<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class LocalResource extends JsonResource
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
            'user_id' => new UserResource(User::find($this->user_id)),
            'name' => $this->name,
            'type' => $this->type,
            'description' => $this->description,
            'email' => $this->email,
            'phone' => $this->phone,
            'image' => $this->image && !(str_starts_with($this->image, 'http')) ?
                Storage::url($this->image) : $this->image,
            'address' => $this->address,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'city' => $this->city,
            'region' => $this->region,
            'verified' => $this->verified,
            'rating' => $this->rating,
        ];
    }
}
