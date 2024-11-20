<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Local extends Model
{
    use HasFactory;

    protected $table = 'local';

    public function beers(): BelongsToMany
    {
        return $this->belongsToMany(Beer::class, 'beer_local', 'local_id', 'beer_id');
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(LocalRating::class);
    }

}
