<?php

namespace App\Models;

use App\Enums\SubscriptionPeriod;
use App\Enums\SubscriptionStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'stripe_customer_id', 'stripe_subscription_id', 'period', 'status', 'current_period_start', 'current_period_end', 'canceled_at'])]
class Subscription extends Model
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isActive(): bool
    {
        return $this->status === SubscriptionStatus::Active
            && $this->current_period_end->isFuture();
    }

    protected function casts(): array
    {
        return [
            'period' => SubscriptionPeriod::class,
            'status' => SubscriptionStatus::class,
            'current_period_start' => 'datetime',
            'current_period_end' => 'datetime',
            'canceled_at' => 'datetime',
        ];
    }
}
