<?php

namespace Database\Seeders;

use App\Enums\CourseStatus;
use App\Enums\UserRole;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Seeder;

class EnrollmentSeeder extends Seeder
{
    public function run(): void
    {
        $students = User::where('role', UserRole::Student)->get();
        $publishedCourses = Course::where('status', CourseStatus::Published)->get();

        // 20 de 30 estudiantes tienen suscripción activa
        $students->take(20)->each(function ($student) {
            Subscription::factory()->create(['user_id' => $student->id]);
        });

        // Cada estudiante se inscribe en 3 cursos aleatorios
        $students->each(function ($student) use ($publishedCourses) {
            $courses = $publishedCourses->random(min(3, $publishedCourses->count()));

            foreach ($courses as $index => $course) {
                $isCompleted = $index === 0; // primer curso siempre completado

                Enrollment::create([
                    'user_id' => $student->id,
                    'course_id' => $course->id,
                    'completed_at' => $isCompleted ? now()->subDays(rand(1, 60)) : null,
                ]);
            }
        });
    }
}
