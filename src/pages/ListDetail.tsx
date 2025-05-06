import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { useList } from '../context/ListContext';
import { toast } from 'react-toastify';
import { ChartPie, ChevronLeft, CircleAlert, Plus, ShoppingBag, Tag, Trash2 } from 'lucide-react';
import { GroceryItem } from '../types';
import AddItemForm from '../components/AddItemForm';

const ListDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentList, setCurrentList, totalSpent, updateItem, removeItem, deleteList } = useList();
  
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [showCategoryBreakdown, setShowCategoryBreakdown] = useState(false);
  
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Montserrat:wght@700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    if (id) {
      setCurrentList(id);
    }
    
    return () => {
      document.head.removeChild(link);
    };
  }, [id, setCurrentList]);

  if (!currentList) {
    return (
      <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">List not found</h2>
          <p className="text-gray-500 mb-8">The shopping list you're looking for doesn't exist or has been deleted.</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <ChevronLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const remaining = currentList.budget - totalSpent;
  const percentSpent = (totalSpent / currentList.budget) * 100;
  
  const getBudgetStatus = () => {
    if (percentSpent >= 100) return { color: 'bg-red-500', text: 'text-red-600', message: 'Over Budget!' };
    if (percentSpent >= 90) return { color: 'bg-orange-500', text: 'text-orange-600', message: 'Almost at limit!' };
    if (percentSpent >= 75) return { color: 'bg-yellow-500', text: 'text-yellow-600', message: 'Approaching limit' };
    return { color: 'bg-green-500', text: 'text-green-600', message: 'On Track' };
  };
  
  const budgetStatus = getBudgetStatus();

  const handleToggleCheck = (item: GroceryItem) => {
    updateItem({ ...item, checked: !item.checked });
  };

  const handleDeleteItem = (id: string) => {
    removeItem(id);
    toast.success('Item removed from list');
  };

  const handleDeleteList = () => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      deleteList(currentList.id);
      toast.success('Shopping list deleted');
      navigate('/dashboard');
    }
  };

  // Filter items by category
  const filteredItems = selectedCategoryFilter === 'all' 
    ? currentList.items 
    : currentList.items.filter(item => item.categoryId === selectedCategoryFilter);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="w-full md:w-8/12">
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-md p-6 mb-6 border border-white/50">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">{currentList.name}</h1>
                <button
                  onClick={handleDeleteList}
                  className="text-gray-400 hover:text-red-500 transition"
                  title="Delete List"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Budget: ₱{currentList.budget.toFixed(2)}</span>
                  <span className={`font-medium ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ₱{remaining.toFixed(2)} remaining
                  </span>
                </div>
              </div>

              {filteredItems.length === 0 ? (
                <p>No items in this category.</p>
              ) : (
                filteredItems.map((item) => (
                  <div key={item.id}>
                    <span>{item.name} - ₱{(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => handleToggleCheck(item)}>✔</button>
                    <button onClick={() => handleDeleteItem(item.id)}>❌</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListDetail;
