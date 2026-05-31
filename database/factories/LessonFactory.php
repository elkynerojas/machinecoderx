<?php

namespace Database\Factories;

use App\Enums\LessonType;
use App\Enums\VideoType;
use App\Models\Lesson;
use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Lesson>
 */
class LessonFactory extends Factory
{
    public function definition(): array
    {
        $type = fake()->randomElement(LessonType::cases());

        return [
            'section_id' => Section::factory(),
            'title' => fake()->sentence(rand(3, 6)),
            'order' => 0,
            'type' => $type,
            'video_type' => $type === LessonType::Video ? VideoType::Url : null,
            'video_url' => $type === LessonType::Video ? 'https://www.youtube.com/watch?v=' . fake()->regexify('[A-Za-z0-9]{11}') : null,
            'video_path' => null,
            'duration_seconds' => $type === LessonType::Video ? fake()->numberBetween(300, 3600) : null,
            'content' => $type !== LessonType::Video ? fake()->paragraphs(3, true) : null,
            'is_free_preview' => false,
        ];
    }

    public function video(): static
    {
        return $this->state([
            'type' => LessonType::Video,
            'video_type' => VideoType::Url,
            'video_url' => 'https://www.youtube.com/watch?v=' . fake()->regexify('[A-Za-z0-9]{11}'),
            'duration_seconds' => fake()->numberBetween(300, 3600),
            'content' => null,
        ]);
    }

    public function freePreview(): static
    {
        return $this->state(['is_free_preview' => true]);
    }
}
