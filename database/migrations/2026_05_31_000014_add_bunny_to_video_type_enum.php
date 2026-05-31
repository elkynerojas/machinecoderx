<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("ALTER TABLE lessons MODIFY COLUMN video_type ENUM('url', 'upload', 'bunny') NULL");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE lessons MODIFY COLUMN video_type ENUM('url', 'upload') NULL");
    }
};
