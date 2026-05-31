<?php

namespace App\Http\Controllers;

use App\Enums\SubscriptionStatus;
use App\Enums\VideoType;
use App\Models\Lesson;
use App\Models\Subscription;
use App\Services\BunnyStreamService;
use Illuminate\Http\JsonResponse;

class VideoStreamController extends Controller
{
    public function __construct(private BunnyStreamService $bunny) {}

    public function show(Lesson $lesson): JsonResponse
    {
        if ($lesson->video_type !== VideoType::Bunny) {
            return response()->json(['error' => 'No es un video de Bunny Stream'], 400);
        }

        $hasSubscription = Subscription::where('user_id', auth()->id())
            ->where('status', SubscriptionStatus::Active)
            ->where('current_period_end', '>', now())
            ->exists();

        if (! $hasSubscription && ! $lesson->is_free_preview) {
            return response()->json(['error' => 'Se requiere suscripción activa'], 403);
        }

        $url = $this->bunny->signedEmbedUrl($lesson->video_path);

        return response()->json(['url' => $url]);
    }
}
