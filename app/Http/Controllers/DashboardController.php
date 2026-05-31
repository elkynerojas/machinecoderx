<?php

namespace App\Http\Controllers;

use App\Enums\SubscriptionStatus;
use App\Models\Enrollment;
use App\Models\LessonProgress;
use App\Models\Subscription;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $userId = auth()->id();

        $hasSubscription = Subscription::where('user_id', $userId)
            ->where('status', SubscriptionStatus::Active)
            ->where('current_period_end', '>', now())
            ->exists();

        $enrollments = Enrollment::where('user_id', $userId)
            ->with(['course' => fn ($q) => $q->with([
                'sections.lessons',
                'instructor:id,name',
                'category:id,name,slug',
            ])])
            ->latest()
            ->get()
            ->map(function ($enrollment) use ($userId) {
                $lessonIds = $enrollment->course->lessons->pluck('id');
                $total     = $lessonIds->count();
                $completed = $total > 0
                    ? LessonProgress::where('user_id', $userId)
                        ->whereIn('lesson_id', $lessonIds)
                        ->count()
                    : 0;

                return [
                    'course'   => $enrollment->course,
                    'completed' => $completed,
                    'total'    => $total,
                    'percent'  => $total > 0 ? round($completed / $total * 100) : 0,
                    'finished' => $enrollment->completed_at !== null,
                ];
            });

        return Inertia::render('Dashboard', [
            'enrollments'     => $enrollments,
            'hasSubscription' => $hasSubscription,
        ]);
    }
}
