<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingList extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'budget',
        'description',
        'user_id',
    ];
    
    /**
     * Get the user that owns the shopping list.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Get the items for the shopping list.
     */
    public function items()
    {
        return $this->hasMany(ShoppingItem::class, 'list_id');
    }
    
    /**
     * Calculate the total spent on this list.
     */
    public function getTotalSpentAttribute()
    {
        return $this->items->sum(function ($item) {
            return $item->price * $item->quantity;
        });
    }
    
    /**
     * Calculate the remaining budget.
     */
    public function getRemainingAttribute()
    {
        return $this->budget - $this->total_spent;
    }
    
    /**
     * Calculate the percentage of budget spent.
     */
    public function getPercentSpentAttribute()
    {
        if ($this->budget <= 0) {
            return 100;
        }
        return min(100, round(($this->total_spent / $this->budget) * 100));
    }
}
