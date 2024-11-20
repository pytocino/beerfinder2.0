<?php

namespace Database\Factories;

use App\Models\Beer;
use App\Models\BeerLocal;
use App\Models\Local;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BeerLocal>
 */
class BeerLocalFactory extends Factory
{
    protected $model = BeerLocal::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'beer_id' => Beer::pluck('id')->random(),
            'local_id' => Local::pluck('id')->random(),
        ];
    }
}
