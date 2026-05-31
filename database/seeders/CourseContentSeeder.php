<?php

namespace Database\Seeders;

use App\Enums\CourseStatus;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Section;
use Illuminate\Database\Seeder;

class CourseContentSeeder extends Seeder
{
    public function run(): void
    {
        Course::where('status', CourseStatus::Published)->each(function ($course) {
            collect(range(1, 4))->each(function ($sectionOrder) use ($course) {
                $section = Section::factory()->create([
                    'course_id' => $course->id,
                    'title' => "Módulo {$sectionOrder}: " . fake()->sentence(3),
                    'order' => $sectionOrder,
                ]);

                collect(range(1, 4))->each(function ($lessonOrder) use ($section) {
                    Lesson::factory()
                        ->when($lessonOrder === 1, fn ($f) => $f->freePreview())
                        ->create([
                            'section_id' => $section->id,
                            'order' => $lessonOrder,
                        ]);
                });
            });
        });
    }
}
