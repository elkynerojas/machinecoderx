<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\LessonProgress;
use Illuminate\Http\JsonResponse;

class LessonProgressController extends Controller
{
    public function toggle(Lesson $lesson): JsonResponse
    {
        $userId = auth()->id();

        $progress = LessonProgress::where('user_id', $userId)
            ->where('lesson_id', $lesson->id)
            ->first();

        if ($progress) {
            $progress->delete();
            $completed = false;
        } else {
            LessonProgress::create([
                'user_id'      => $userId,
                'lesson_id'    => $lesson->id,
                'completed_at' => now(),
            ]);
            $completed = true;

            // Verificar si el curso quedó 100% completado
            $courseId   = $lesson->section->course_id;
            $enrollment = Enrollment::where('user_id', $userId)
                ->where('course_id', $courseId)
                ->first();

            if ($enrollment && ! $enrollment->completed_at) {
                $totalLessons = Lesson::whereHas('section', fn ($q) => $q->where('course_id', $courseId))->count();
                $doneCount    = LessonProgress::where('user_id', $userId)
                    ->whereHas('lesson.section', fn ($q) => $q->where('course_id', $courseId))
                    ->count();

                if ($doneCount >= $totalLessons) {
                    $enrollment->update(['completed_at' => now()]);
                }
            }
        }

        return response()->json(['completed' => $completed]);
    }
}
