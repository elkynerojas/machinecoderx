<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum NavigationGroup implements HasLabel
{
    case Content;
    case Users;
    case Moderation;
    case Finance;

    public function getLabel(): string
    {
        return match ($this) {
            self::Content => 'Contenido',
            self::Users => 'Usuarios',
            self::Moderation => 'Moderación',
            self::Finance => 'Finanzas',
        };
    }
}
