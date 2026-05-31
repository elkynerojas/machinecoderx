<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum VideoType: string implements HasLabel
{
    case Url = 'url';
    case Upload = 'upload';

    public function getLabel(): string
    {
        return match ($this) {
            self::Url => 'URL externa',
            self::Upload => 'Archivo subido',
        };
    }
}
