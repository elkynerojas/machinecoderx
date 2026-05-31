<?php

namespace Database\Factories;

use App\Enums\CourseLevel;
use App\Enums\CourseStatus;
use App\Models\Category;
use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Course>
 */
class CourseFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->unique()->sentence(rand(3, 6));
        $title = rtrim($title, '.');

        return [
            'instructor_id' => User::where('role', 'teacher')->inRandomOrder()->first()?->id
                ?? User::factory()->teacher()->create()->id,
            'category_id' => Category::inRandomOrder()->first()?->id,
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => fake()->paragraphs(3, true),
            'thumbnail' => null,
            'level' => fake()->randomElement(CourseLevel::cases()),
            'status' => CourseStatus::Published,
            'price' => fake()->randomElement([49.99, 79.99, 99.99, 149.99, 199.99, 249.99, 299.99]),
        ];
    }

    public function draft(): static
    {
        return $this->state(['status' => CourseStatus::Draft]);
    }

    public function archived(): static
    {
        return $this->state(['status' => CourseStatus::Archived]);
    }
}
