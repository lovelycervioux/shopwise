<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ShoppingList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShoppingListController extends Controller
{
    /**
     * Display the specified shopping list.
     */
    public function show(ShoppingList $list)
    {
        // Authorize that the current user owns this list
        $this->authorize('view', $list);
        
        $categories = Category::orderBy('name')->get();
        
        return view('lists.show', [
            'list' => $list,
            'categories' => $categories
        ]);
    }
    
    /**
     * Show the form for creating a new shopping list.
     */
    public function create()
    {
        return view('lists.create');
    }
    
    /**
     * Store a newly created shopping list in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'budget' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);
        
        $list = Auth::user()->shoppingLists()->create($validated);
        
        return redirect()->route('lists.show', $list)
            ->with('success', 'Shopping list created successfully!');
    }
    
    /**
     * Remove the specified shopping list from storage.
     */
    public function destroy(ShoppingList $list)
    {
        // Authorize that the current user owns this list
        $this->authorize('delete', $list);
        
        $list->delete();
        
        return redirect()->route('dashboard')
            ->with('success', 'Shopping list deleted successfully!');
    }
}
