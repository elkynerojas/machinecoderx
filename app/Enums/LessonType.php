<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;

enum LessonType: string implements HasColor, HasIcon, HasLabel
{
    case Video = 'video';
    case Text = 'text';
    case Exercise = 'exercise';

    public function getLabel(): string
    {
        return match ($this) {
            self::Video => 'Video',
            self::Text => 'Texto',
            self::Exercise => 'Ejercicio',
        };
    }

    public function getColor(): string|array|null
    {
        return match ($this) {
            self::Video => 'info',
            self::Text => 'gray',
            self::Exercise => 'warning',
        };
    }

    public function getIcon(): string
    {
        return match ($this) {
            self::Video => 'heroicon-o-play-circle',
            self::Text => 'heroicon-o-document-text',
            self::Exercise => 'heroicon-o-academic-cap',
        };
    }
}
