<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $teachers = User::where('role', UserRole::Teacher)->get();

        // 15 cursos publicados, distribuidos entre los teachers
        $teachers->each(function ($teacher) {
            Course::factory()->count(3)->create(['instructor_id' => $teacher->id]);
        });

        // 3 borradores y 2 archivados
        Course::factory()->draft()->count(3)->create(['instructor_id' => $teachers->random()->id]);
        Course::factory()->archived()->count(2)->create(['instructor_id' => $teachers->random()->id]);
    }
}
