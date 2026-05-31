<?php

namespace App\Models;

use App\Enums\LessonType;
use App\Enums\VideoType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['section_id', 'title', 'order', 'type', 'video_type', 'video_url', 'video_path', 'duration_seconds', 'content', 'is_free_preview'])]
class Lesson extends Model
{
    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }

    public function progress(): HasMany
    {
        return $this->hasMany(LessonProgress::class);
    }

    protected function casts(): array
    {
        return [
            'type' => LessonType::class,
            'video_type' => VideoType::class,
            'is_free_preview' => 'boolean',
        ];
    }
}
