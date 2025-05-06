import React, { createContext, useState, useContext, useEffect } from 'react';
import { ShoppingList, GroceryItem, Category } from '../types';
import { defaultCategories } from '../data/initialData';

interface ListContextType {
  lists: ShoppingList[];
  categories: Category[];
  currentList: ShoppingList | null;
  createList: (name: string, budget: number) => void;
  updateList: (updatedList: ShoppingList) => void;
  deleteList: (id: string) => void;
  setCurrentList: (id: string | null) => void;
  addItem: (item: Omit<GroceryItem, 'id'>) => void;
  updateItem: (item: GroceryItem) => void;
  removeItem: (id: string) => void;
  addCategory: (name: string) => void;
  totalSpent: number;
}

const ListContext = createContext<ListContextType | undefined>(undefined);

export const useList = () => {
  const context = useContext(ListContext);
  if (context === undefined) {
    throw new Error('useList must be used within a ListProvider');
  }
  return context;
};

export const ListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [currentList, setCurrentListState] = useState<ShoppingList | null>(null);
  const [totalSpent, setTotalSpent] = useState<number>(0);

  useEffect(() => {
    const storedLists = localStorage.getItem('shopwise_lists');
    const storedCategories = localStorage.getItem('shopwise_categories');
    
    if (storedLists) {
      setLists(JSON.parse(storedLists));
    }
    
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(defaultCategories);
      localStorage.setItem('shopwise_categories', JSON.stringify(defaultCategories));
    }
  }, []);

  useEffect(() => {
    if (currentList) {
      const total = currentList.items.reduce(
        (sum, item) => sum + (item.price * item.quantity), 
        0
      );
      setTotalSpent(total);
    } else {
      setTotalSpent(0);
    }
  }, [currentList]);

  useEffect(() => {
    localStorage.setItem('shopwise_lists', JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    localStorage.setItem('shopwise_categories', JSON.stringify(categories));
  }, [categories]);

  const createList = (name: string, budget: number) => {
    const newList: ShoppingList = {
      id: Date.now().toString(),
      name,
      budget,
      createdAt: new Date().toISOString(),
      items: [],
    };
    setLists(prev => [...prev, newList]);
    setCurrentListState(newList);
  };

  const updateList = (updatedList: ShoppingList) => {
    setLists(prev => prev.map(list => 
      list.id === updatedList.id ? updatedList : list
    ));
    
    if (currentList?.id === updatedList.id) {
      setCurrentListState(updatedList);
    }
  };

  const deleteList = (id: string) => {
    setLists(prev => prev.filter(list => list.id !== id));
    if (currentList?.id === id) {
      setCurrentListState(null);
    }
  };

  const setCurrentList = (id: string | null) => {
    if (!id) {
      setCurrentListState(null);
      return;
    }
    
    const list = lists.find(l => l.id === id) || null;
    setCurrentListState(list);
  };

  const addItem = (item: Omit<GroceryItem, 'id'>) => {
    if (!currentList) return;
    
    // Ensure price and quantity are numbers
    const validatedItem = {
      ...item,
      price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
      quantity: typeof item.quantity === 'string' ? parseInt(item.quantity.toString()) : item.quantity
    };
    
    const newItem: GroceryItem = {
      ...validatedItem,
      id: Date.now().toString(),
    };
    
    console.log('Adding item to list:', newItem);
    
    const updatedList = {
      ...currentList,
      items: [...currentList.items, newItem],
    };
    
    updateList(updatedList);
  };

  const updateItem = (item: GroceryItem) => {
    if (!currentList) return;
    
    const updatedList = {
      ...currentList,
      items: currentList.items.map(i => 
        i.id === item.id ? item : i
      ),
    };
    
    updateList(updatedList);
  };

  const removeItem = (id: string) => {
    if (!currentList) return;
    
    const updatedList = {
      ...currentList,
      items: currentList.items.filter(i => i.id !== id),
    };
    
    updateList(updatedList);
  };

  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      isDefault: false,
    };
    
    setCategories(prev => [...prev, newCategory]);
  };

  return (
    <ListContext.Provider
      value={{
        lists,
        categories,
        currentList,
        createList,
        updateList,
        deleteList,
        setCurrentList,
        addItem,
        updateItem,
        removeItem,
        addCategory,
        totalSpent,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
