<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum VideoType: string implements HasLabel
{
    case Url    = 'url';
    case Upload = 'upload';
    case Bunny  = 'bunny';

    public function getLabel(): string
    {
        return match ($this) {
            self::Url    => 'URL externa (YouTube, Vimeo…)',
            self::Upload => 'Archivo local',
            self::Bunny  => 'Bunny Stream',
        };
    }
}
