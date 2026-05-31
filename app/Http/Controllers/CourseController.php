<?php

namespace App\Http\Controllers;

use App\Enums\SubscriptionStatus;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\LessonProgress;
use App\Models\Subscription;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function show(Course $course): Response
    {
        $course->load([
            'sections.lessons',
            'instructor:id,name,bio,avatar',
            'category:id,name,slug',
            'ratings:course_id,value',
        ]);

        $hasSubscription = auth()->check()
            ? Subscription::where('user_id', auth()->id())
                ->where('status', SubscriptionStatus::Active)
                ->where('current_period_end', '>', now())
                ->exists()
            : false;

        if (! $hasSubscription) {
            return Inertia::render('Course/Overview', [
                'course' => $course,
            ]);
        }

        // Crear inscripción automáticamente al entrar con suscripción
        $enrollment = Enrollment::firstOrCreate([
            'user_id'   => auth()->id(),
            'course_id' => $course->id,
        ]);

        $allLessonIds = $course->sections->flatMap(fn ($s) => $s->lessons->pluck('id'));

        $completedIds = LessonProgress::where('user_id', auth()->id())
            ->whereIn('lesson_id', $allLessonIds)
            ->pluck('lesson_id')
            ->toArray();

        // Lección actual: query param o primera del curso
        $firstLesson = $course->sections->first()?->lessons->first();
        $currentLessonId = (int) request('lesson', $firstLesson?->id);

        $totalLessons    = $allLessonIds->count();
        $completedCount  = count($completedIds);

        return Inertia::render('Course/Show', [
            'course'          => $course,
            'currentLessonId' => $currentLessonId,
            'completedIds'    => $completedIds,
            'totalLessons'    => $totalLessons,
            'completedCount'  => $completedCount,
            'enrollment'      => $enrollment,
        ]);
    }
}
