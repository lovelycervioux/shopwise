import React, { createContext, useState, useContext, useEffect } from 'react';
import { ShoppingList, GroceryItem, Category } from '../types';
import { defaultCategories } from '../data/initialData';
import { useAuth } from './AuthContext';

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
  const { currentUser } = useAuth();
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [currentList, setCurrentListState] = useState<ShoppingList | null>(null);
  const [totalSpent, setTotalSpent] = useState<number>(0);

  // User-specific storage keys
  const listsKey = `shopwise_lists_${currentUser?.id || 'guest'}`;
  const categoriesKey = `shopwise_categories_${currentUser?.id || 'guest'}`;

  useEffect(() => {
    const loadData = () => {
      const storedLists = localStorage.getItem(listsKey);
      const storedCategories = localStorage.getItem(categoriesKey);
      
      if (storedLists) setLists(JSON.parse(storedLists));
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      } else {
        localStorage.setItem(categoriesKey, JSON.stringify(defaultCategories));
      }
    };
    
    if (currentUser) loadData();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(listsKey, JSON.stringify(lists));
    }
  }, [lists]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(categoriesKey, JSON.stringify(categories));
    }
  }, [categories]);

  useEffect(() => {
    const total = currentList?.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
    setTotalSpent(total);
  }, [currentList]);

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
    if (currentList?.id === updatedList.id) setCurrentListState(updatedList);
  };

  const deleteList = (id: string) => {
    setLists(prev => prev.filter(list => list.id !== id));
    if (currentList?.id === id) setCurrentListState(null);
  };

  const setCurrentList = (id: string | null) => {
    const list = id ? lists.find(l => l.id === id) || null : null;
    setCurrentListState(list);
  };

  const addItem = (item: Omit<GroceryItem, 'id'>) => {
    if (!currentList) return;
    const newItem = { ...item, id: Date.now().toString() };
    updateList({ ...currentList, items: [...currentList.items, newItem] });
  };

  const updateItem = (item: GroceryItem) => {
    if (!currentList) return;
    updateList({
      ...currentList,
      items: currentList.items.map(i => i.id === item.id ? item : i)
    });
  };

  const removeItem = (id: string) => {
    if (!currentList) return;
    updateList({
      ...currentList,
      items: currentList.items.filter(i => i.id !== id)
    });
  };

  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      isDefault: false
    };
    setCategories(prev => [...prev, newCategory]);
  };

  return (
    <ListContext.Provider value={{
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
      totalSpent
    }}>
      {children}
    </ListContext.Provider>
  );
};
