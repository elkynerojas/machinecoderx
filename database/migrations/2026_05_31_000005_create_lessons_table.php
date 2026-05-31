<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('section_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->unsignedSmallInteger('order')->default(0);
            $table->enum('type', ['video', 'text', 'exercise']);
            $table->enum('video_type', ['url', 'upload'])->nullable();
            $table->string('video_url')->nullable();
            $table->string('video_path')->nullable();
            $table->unsignedInteger('duration_seconds')->nullable();
            $table->longText('content')->nullable();
            $table->boolean('is_free_preview')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
