<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Enrollment;
use App\Models\Rating;
use Illuminate\Database\Seeder;

class InteractionSeeder extends Seeder
{
    public function run(): void
    {
        $completedEnrollments = Enrollment::whereNotNull('completed_at')->get();

        foreach ($completedEnrollments as $enrollment) {
            Rating::create([
                'user_id' => $enrollment->user_id,
                'course_id' => $enrollment->course_id,
                'value' => fake()->randomElement([3, 4, 4, 5, 5, 5]),
            ]);

            if (rand(0, 1)) {
                Comment::create([
                    'user_id' => $enrollment->user_id,
                    'course_id' => $enrollment->course_id,
                    'body' => fake()->paragraph(),
                    'is_flagged' => false,
                ]);
            }
        }

        // Marcar 3 comentarios como reportados
        Comment::inRandomOrder()->limit(3)->get()->each->update(['is_flagged' => true]);
    }
}
