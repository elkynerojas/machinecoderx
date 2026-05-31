<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum SubscriptionPeriod: string implements HasColor, HasLabel
{
    case Monthly = 'monthly';
    case Annual = 'annual';

    public function getLabel(): string
    {
        return match ($this) {
            self::Monthly => 'Mensual',
            self::Annual => 'Anual',
        };
    }

    public function getColor(): string|array|null
    {
        return match ($this) {
            self::Monthly => 'info',
            self::Annual => 'success',
        };
    }
}
