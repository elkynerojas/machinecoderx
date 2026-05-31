<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum SubscriptionStatus: string implements HasColor, HasLabel
{
    case Active = 'active';
    case Canceled = 'canceled';
    case PastDue = 'past_due';
    case Trialing = 'trialing';

    public function getLabel(): string
    {
        return match ($this) {
            self::Active => 'Activa',
            self::Canceled => 'Cancelada',
            self::PastDue => 'Pago pendiente',
            self::Trialing => 'En prueba',
        };
    }

    public function getColor(): string|array|null
    {
        return match ($this) {
            self::Active => 'success',
            self::Canceled => 'gray',
            self::PastDue => 'danger',
            self::Trialing => 'info',
        };
    }
}
