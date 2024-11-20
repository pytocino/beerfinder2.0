<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LocalRating extends Model
{
    use HasFactory;

    protected $table = "local_ratings";

    protected $fillable = ['local_id', 'rating', 'comment'];

    public function local(): BelongsTo
    {
        return $this->belongsTo(Local::class);
    }
}
