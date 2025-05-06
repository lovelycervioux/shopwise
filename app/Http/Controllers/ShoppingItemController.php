<?php

namespace App\Http\Controllers;

use App\Models\ShoppingItem;
use App\Models\ShoppingList;
use Illuminate\Http\Request;

class ShoppingItemController extends Controller
{
    /**
     * Store a newly created shopping item in storage.
     */
    public function store(Request $request, ShoppingList $list)
    {
        // Authorize that the current user owns this list
        $this->authorize('view', $list);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'category_id' => 'required|exists:categories,id',
        ]);
        
        $item = $list->items()->create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
            'category_id' => $validated['category_id'],
            'checked' => false,
        ]);
        
        return redirect()->back()
            ->with('success', 'Item added successfully!');
    }
    
    /**
     * Update the specified shopping item in storage.
     */
    public function update(Request $request, ShoppingItem $item)
    {
        // Authorize that the current user owns this item
        $this->authorize('update', $item);
        
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'quantity' => 'sometimes|required|integer|min:1',
            'category_id' => 'sometimes|required|exists:categories,id',
            'checked' => 'sometimes|required|boolean',
        ]);
        
        $item->update($validated);
        
        return redirect()->back()
            ->with('success', 'Item updated successfully!');
    }
    
    /**
     * Toggle the checked status of a shopping item.
     */
    public function toggleChecked(ShoppingItem $item)
    {
        // Authorize that the current user owns this item
        $this->authorize('update', $item);
        
        $item->update([
            'checked' => !$item->checked,
        ]);
        
        return redirect()->back();
    }
    
    /**
     * Remove the specified shopping item from storage.
     */
    public function destroy(ShoppingItem $item)
    {
        // Authorize that the current user owns this item
        $this->authorize('delete', $item);
        
        $item->delete();
        
        return redirect()->back()
            ->with('success', 'Item removed from list');
    }
}
