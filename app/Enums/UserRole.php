<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum UserRole: string implements HasColor, HasLabel
{
    case Admin = 'admin';
    case Student = 'student';
    case Teacher = 'teacher';

    public function getLabel(): string
    {
        return match ($this) {
            self::Admin => 'Administrador',
            self::Student => 'Estudiante',
            self::Teacher => 'Profesor',
        };
    }

    public function getColor(): string|array|null
    {
        return match ($this) {
            self::Admin => 'danger',
            self::Student => 'info',
            self::Teacher => 'success',
        };
    }
}
