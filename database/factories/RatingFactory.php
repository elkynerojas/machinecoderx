<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Rating>
 */
class RatingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->student(),
            'course_id' => Course::factory(),
            'value' => fake()->randomElement([3, 4, 4, 5, 5, 5]),
        ];
    }
}
