<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Store a newly created category in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
        ]);
        
        $category = Category::create([
            'name' => $validated['name'],
            'is_default' => false,
        ]);
        
        return redirect()->back()
            ->with('success', 'Category created successfully!');
    }
}
