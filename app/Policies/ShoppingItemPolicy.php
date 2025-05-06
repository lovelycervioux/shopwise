<?php

namespace App\Policies;

use App\Models\ShoppingItem;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ShoppingItemPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the shopping item.
     */
    public function update(User $user, ShoppingItem $shoppingItem): bool
    {
        return $user->id === $shoppingItem->shoppingList->user_id;
    }

    /**
     * Determine whether the user can delete the shopping item.
     */
    public function delete(User $user, ShoppingItem $shoppingItem): bool
    {
        return $user->id === $shoppingItem->shoppingList->user_id;
    }
}
