<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Comment>
 */
class CommentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->student(),
            'course_id' => Course::factory(),
            'body' => fake()->paragraph(),
            'is_flagged' => false,
        ];
    }

    public function flagged(): static
    {
        return $this->state(['is_flagged' => true]);
    }
}
