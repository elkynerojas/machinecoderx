<?php

namespace Database\Factories;

use App\Enums\SubscriptionPeriod;
use App\Enums\SubscriptionStatus;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Subscription>
 */
class SubscriptionFactory extends Factory
{
    public function definition(): array
    {
        $period = fake()->randomElement(SubscriptionPeriod::cases());
        $daysInPeriod = $period === SubscriptionPeriod::Monthly ? 30 : 365;
        $start = now()->subDays(15);

        return [
            'user_id' => User::factory()->student(),
            'stripe_customer_id' => 'cus_' . Str::random(14),
            'stripe_subscription_id' => 'sub_' . Str::random(14),
            'period' => $period,
            'status' => SubscriptionStatus::Active,
            'current_period_start' => $start,
            'current_period_end' => $start->copy()->addDays($daysInPeriod),
            'canceled_at' => null,
        ];
    }
}
