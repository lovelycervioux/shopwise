<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingItem extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'price',
        'quantity',
        'category_id',
        'checked',
        'list_id',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'price' => 'decimal:2',
        'quantity' => 'integer',
        'checked' => 'boolean',
    ];
    
    /**
     * Get the shopping list that owns the item.
     */
    public function shoppingList()
    {
        return $this->belongsTo(ShoppingList::class, 'list_id');
    }
    
    /**
     * Get the category that owns the item.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    
    /**
     * Calculate the total price of this item.
     */
    public function getTotalAttribute()
    {
        return $this->price * $this->quantity;
    }
}
