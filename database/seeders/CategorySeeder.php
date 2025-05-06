<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Produce', 'is_default' => true],
            ['name' => 'Dairy', 'is_default' => true],
            ['name' => 'Meat', 'is_default' => true],
            ['name' => 'Bakery', 'is_default' => true],
            ['name' => 'Frozen', 'is_default' => true],
            ['name' => 'Canned Goods', 'is_default' => true],
            ['name' => 'Beverages', 'is_default' => true],
            ['name' => 'Snacks', 'is_default' => true],
            ['name' => 'Other', 'is_default' => true],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
