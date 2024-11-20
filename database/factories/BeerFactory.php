<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Beer>
 */
class BeerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'name' => fake()->name(),
            'color' => fake()->colorName(),
            'graduation' => fake()->randomFloat(2, 1, 100),
            'taste' => fake()->text(),
            'type' => fake()->randomElement(['lager', 'ale', 'stout', 'malt', 'porter', 'IPA', 'wheat', 'pilsner', 'sour']),
            'description' => fake()->text(),
            'image' => fake()->imageUrl(),
            'country' => fake()->country(),
            'city' => fake()->city(),
            'region' => fake()->country(),
            'rating' => fake()->randomFloat(2, 1, 5),
        ];
    }
}
