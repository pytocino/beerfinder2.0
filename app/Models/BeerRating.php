<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BeerRating extends Model
{
    use HasFactory;

    protected $fillable = ['beer_id', 'user_id', 'rating', 'comment'];

    public function beer()
    {
        return $this->belongsTo(Beer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
