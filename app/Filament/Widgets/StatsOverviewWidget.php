<?php

namespace App\Filament\Widgets;

use App\Enums\CourseStatus;
use App\Enums\SubscriptionStatus;
use App\Enums\UserRole;
use App\Models\Comment;
use App\Models\Course;
use App\Models\Subscription;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Estudiantes', User::where('role', UserRole::Student)->count())
                ->icon('heroicon-o-users')
                ->color('info'),

            Stat::make('Suscripciones activas', Subscription::where('status', SubscriptionStatus::Active)->count())
                ->icon('heroicon-o-credit-card')
                ->color('success'),

            Stat::make('Cursos publicados', Course::where('status', CourseStatus::Published)->count())
                ->icon('heroicon-o-academic-cap')
                ->color('primary'),

            Stat::make('Comentarios por revisar', Comment::where('is_flagged', true)->count())
                ->icon('heroicon-o-flag')
                ->color('danger'),
        ];
    }
}
