<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Events>
 */
class EventsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'event_type' => $this->faker->randomElement(['visit', 'login', 'logout', 'error', 'custom_event']),
            'event_date' => $this->faker->date(),
            'event_time' => $this->faker->time(),
            'previous_url' => $this->faker->url(),
            'ip_address' => $this->faker->ipv4,
            'additional_info' => $this->faker->text(),
        ];
    }
}
