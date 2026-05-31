<?php

namespace Database\Seeders;

use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\LessonProgress;
use Illuminate\Database\Seeder;

class ProgressSeeder extends Seeder
{
    public function run(): void
    {
        Enrollment::with('course.lessons')->each(function ($enrollment) {
            $lessons = $enrollment->course->lessons;

            if ($lessons->isEmpty()) {
                return;
            }

            if ($enrollment->completed_at) {
                // Completado: todas las lecciones
                $lessonsToMark = $lessons;
            } else {
                // En progreso: 30-70% de las lecciones
                $count = (int) ceil($lessons->count() * (rand(30, 70) / 100));
                $lessonsToMark = $lessons->take($count);
            }

            foreach ($lessonsToMark as $lesson) {
                LessonProgress::firstOrCreate([
                    'user_id' => $enrollment->user_id,
                    'lesson_id' => $lesson->id,
                ], [
                    'completed_at' => now()->subDays(rand(1, 30)),
                ]);
            }
        });
    }
}
