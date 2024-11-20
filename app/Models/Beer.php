<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Beer extends Model
{
    use HasFactory;

    protected $table = 'beers';

    public function locals(): BelongsToMany
    {
        return $this->belongsToMany(Local::class, 'beer_local', 'beer_id', 'local_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
