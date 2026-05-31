<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['coupon_id', 'user_id', 'redeemed_at', 'access_until'])]
class CouponRedemption extends Model
{
    public $timestamps = false;

    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isActive(): bool
    {
        return $this->access_until->isFuture();
    }

    protected function casts(): array
    {
        return [
            'redeemed_at' => 'datetime',
            'access_until' => 'datetime',
        ];
    }
}
