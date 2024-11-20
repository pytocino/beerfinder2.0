<?php

namespace Database\Seeders;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Model::unguard();
        Schema::disableForeignKeyConstraints();
        $this->call([
            UserSeeder::class,
            LocalSeeder::class,
            BeerSeeder::class,
            EventsSeeder::class,
            BeerLocalSeeder::class,
        ]);
        Schema::enableForeignKeyConstraints();
        Model::reguard();
    }
}
