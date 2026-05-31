<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Programación Web',
            'Diseño UI/UX',
            'Marketing Digital',
            'Ciencia de Datos',
            'DevOps',
            'Mobile',
            'Seguridad Informática',
            'Bases de Datos',
            'Inteligencia Artificial',
            'Negocios y Emprendimiento',
        ];

        foreach ($categories as $name) {
            Category::create([
                'name' => $name,
                'slug' => Str::slug($name),
            ]);
        }
    }
}
