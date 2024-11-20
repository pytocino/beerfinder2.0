<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::truncate();
        User::factory(99)->create();
        User::factory(
            [
                'name' => env('ADMIN_NAME'),
                'email' => env('ADMIN_EMAIL'),
                'password' => bcrypt(env('ADMIN_PASSWORD'))
            ]
        )->create();
    }
}
