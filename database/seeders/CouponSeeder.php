<?php

namespace Database\Seeders;

use App\Models\Coupon;
use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
    public function run(): void
    {
        $coupons = [
            ['code' => 'BIENVENIDA', 'access_days' => 30, 'max_uses' => null, 'expires_at' => null],
            ['code' => 'BETA2026', 'access_days' => 90, 'max_uses' => 100, 'expires_at' => now()->addMonths(6)],
            ['code' => 'GRATIS7', 'access_days' => 7, 'max_uses' => 50, 'expires_at' => now()->addMonths(3)],
            ['code' => 'PROMO14', 'access_days' => 14, 'max_uses' => null, 'expires_at' => now()->addMonth()],
            ['code' => 'TEST365', 'access_days' => 365, 'max_uses' => 10, 'expires_at' => null],
        ];

        foreach ($coupons as $coupon) {
            Coupon::create(array_merge($coupon, ['is_active' => true]));
        }
    }
}
