<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BeerLocal extends Model
{
    use HasFactory;
    protected $table = 'beer_local';
    public function beer(): BelongsTo
    {
        return $this->belongsTo(Beer::class);
    }

    public function local(): BelongsTo
    {
        return $this->belongsTo(Local::class);
    }
    // public function getBeer()
    // {
    //     return $this->beer;
    // }
    // public function getLocal()
    // {
    //     return $this->local;
    // }
}
