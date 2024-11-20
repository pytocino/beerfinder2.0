<?php

namespace Database\Seeders;

use App\Models\Beer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BeerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Beer::truncate();
        Beer::factory(100)->create();
    }
}
