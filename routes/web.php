<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LessonProgressController;
use App\Http\Controllers\VideoStreamController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');

Route::get('/cursos/{course:slug}', [CourseController::class, 'show'])->name('course.show');

Route::post('/progreso/{lesson}', [LessonProgressController::class, 'toggle'])
    ->middleware('auth')
    ->name('lesson.progress.toggle');

Route::get('/api/lecciones/{lesson}/stream-url', [VideoStreamController::class, 'show'])
    ->middleware('auth')
    ->name('lesson.stream.url');

Route::get('/dashboard', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
