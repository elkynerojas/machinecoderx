<?php

namespace Database\Factories;

use App\Models\Coupon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Coupon>
 */
class CouponFactory extends Factory
{
    public function definition(): array
    {
        return [
            'code' => strtoupper(Str::random(8)),
            'access_days' => fake()->randomElement([7, 14, 30, 90]),
            'max_uses' => null,
            'expires_at' => null,
            'is_active' => true,
        ];
    }
}
