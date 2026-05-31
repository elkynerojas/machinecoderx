<?php

namespace App\Services;

class BunnyStreamService
{
    public function signedEmbedUrl(string $videoGuid, int $expiresIn = 14400): string
    {
        $expires   = time() + $expiresIn;
        $tokenKey  = config('services.bunny.token_key');
        $libraryId = config('services.bunny.library_id');

        $token = hash('sha256', $tokenKey . $videoGuid . $expires);

        return "https://iframe.mediadelivery.net/embed/{$libraryId}/{$videoGuid}"
             . "?token={$token}&expires={$expires}&autoplay=false&responsive=true";
    }
}
