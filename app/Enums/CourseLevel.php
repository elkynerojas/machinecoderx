<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum CourseLevel: string implements HasColor, HasLabel
{
    case Beginner = 'beginner';
    case Intermediate = 'intermediate';
    case Advanced = 'advanced';

    public function getLabel(): string
    {
        return match ($this) {
            self::Beginner => 'Principiante',
            self::Intermediate => 'Intermedio',
            self::Advanced => 'Avanzado',
        };
    }

    public function getColor(): string|array|null
    {
        return match ($this) {
            self::Beginner => 'success',
            self::Intermediate => 'warning',
            self::Advanced => 'danger',
        };
    }
}
