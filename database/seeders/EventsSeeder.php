<?php

namespace Database\Seeders;

use App\Models\Events;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Events::truncate();
        Events::factory(100)->create();
    }
}
