export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Category {
  id: string;
  name: string;
  isDefault: boolean;
}

export interface GroceryItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  categoryId: string;
  checked: boolean;
}

export interface ShoppingList {
  id: string;
  name: string;
  budget: number;
  createdAt: string;
  description?: string;
  items: GroceryItem[];
}
