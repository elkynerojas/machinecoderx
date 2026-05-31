<?php

namespace Database\Factories;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'role' => UserRole::Student,
            'avatar' => null,
            'bio' => null,
        ];
    }

    public function admin(): static
    {
        return $this->state([
            'role' => UserRole::Admin,
            'email' => 'admin@machinecoderx.com',
            'name' => 'Admin',
            'password' => Hash::make('admin123'),
        ]);
    }

    public function teacher(): static
    {
        return $this->state([
            'role' => UserRole::Teacher,
            'bio' => fake()->paragraph(),
        ]);
    }

    public function student(): static
    {
        return $this->state([
            'role' => UserRole::Student,
        ]);
    }

    public function unverified(): static
    {
        return $this->state(['email_verified_at' => null]);
    }
}
