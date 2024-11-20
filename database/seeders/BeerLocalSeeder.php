<?php

namespace Database\Seeders;

use App\Models\BeerLocal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BeerLocalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BeerLocal::truncate();
        BeerLocal::factory(2000)->create();
    }
}
