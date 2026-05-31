<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->admin()->create();

        User::factory()->teacher()->count(5)->sequence(
            ['email' => 'teacher1@machinecoderx.com', 'name' => 'Ana García'],
            ['email' => 'teacher2@machinecoderx.com', 'name' => 'Carlos Méndez'],
            ['email' => 'teacher3@machinecoderx.com', 'name' => 'Laura Torres'],
            ['email' => 'teacher4@machinecoderx.com', 'name' => 'Andrés Ruiz'],
            ['email' => 'teacher5@machinecoderx.com', 'name' => 'Sofía Vargas'],
        )->create();

        User::factory()->student()->count(30)->create();
    }
}
