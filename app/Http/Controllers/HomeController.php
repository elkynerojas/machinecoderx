<?php

namespace App\Http\Controllers;

use App\Enums\CourseStatus;
use App\Enums\SubscriptionStatus;
use App\Models\Category;
use App\Models\Subscription;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $categories = Category::with([
            'courses' => fn ($q) => $q
                ->where('status', CourseStatus::Published)
                ->with(['instructor:id,name', 'ratings:course_id,value'])
                ->withCount(['sections', 'lessons', 'enrollments'])
                ->orderBy('created_at', 'desc'),
        ])->whereHas('courses', fn ($q) => $q->where('status', CourseStatus::Published))
          ->get();

        $hasSubscription = auth()->check()
            ? Subscription::where('user_id', auth()->id())
                ->where('status', SubscriptionStatus::Active)
                ->where('current_period_end', '>', now())
                ->exists()
            : false;

        return Inertia::render('Welcome', [
            'categories'      => $categories,
            'hasSubscription' => $hasSubscription,
            'canLogin'        => Route::has('login'),
            'canRegister'     => Route::has('register'),
        ]);
    }
}
