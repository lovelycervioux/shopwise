import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { useList } from '../context/ListContext';
import { toast } from 'react-toastify';
import { ChartPie, ChevronLeft, CircleAlert, DollarSign, Edit, Plus, ShoppingBag, Tag, Trash2 } from 'lucide-react';
import { GroceryItem } from '../types';
import AddItemForm from '../components/AddItemForm';

const ListDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    lists, 
    currentList, 
    setCurrentList, 
    totalSpent, 
    updateItem, 
    removeItem,
    deleteList
  } = useList();
  
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [showCategoryBreakdown, setShowCategoryBreakdown] = useState(false);
  const [editingItem, setEditingItem] = useState<GroceryItem | null>(null);
  
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
    updateItem({
      ...item,
      checked: !item.checked
    });
  };

  const handleDeleteItem = (id: string) => {
    removeItem(id);
    toast.success('Item removed from list');
  };

  const handleEditItem = (item: GroceryItem) => {
    setEditingItem(item);
    setShowAddItemForm(true);
  };

  const handleDeleteList = () => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      deleteList(currentList.id);
      toast.success('Shopping list deleted');
      navigate('/dashboard');
    }
  };

  const filteredItems = selectedCategoryFilter === 'all' 
    ? currentList.items 
    : currentList.items.filter(item => item.categoryId === selectedCategoryFilter);

  const uniqueCategories = Array.from(
  new Set(currentList.items.map(item => item.categoryId))
);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition"
          >
            <ChevronLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="w-full md:w-8/12">
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-md p-6 mb-6 border border-white/50">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {currentList.name}
                </h1>
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
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div 
                    className={`h-2.5 rounded-full ${budgetStatus.color}`}
                    style={{ width: `${Math.min(percentSpent, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    ₱{totalSpent.toFixed(2)} spent
                  </span>
                  <span className={`${budgetStatus.text} font-medium`}>
                    {budgetStatus.message}
                  </span>
                </div>
              </div>
              
              {currentList.items.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="mx-auto text-gray-300 mb-3" size={40} />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Your list is empty</h3>
                  <p className="text-gray-500 mb-4">Start adding items to your shopping list</p>
                  <button
                    onClick={() => setShowAddItemForm(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Plus size={18} />
                    Add First Item
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <label htmlFor="categoryFilter" className="text-sm text-gray-600 mr-2">
                        Filter by:
                      </label>
                      <select
                        id="categoryFilter"
                        value={selectedCategoryFilter}
                        onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="all">All Categories</option>
                        {uniqueCategories.map(catId => (
                          <option key={catId} value={catId}>
                            {catId}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => setShowAddItemForm(true)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                      <Plus size={16} />
                      Add Item
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Qty
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredItems.map((item) => {
                          const itemTotal = item.price * item.quantity;
                          
                          return (
                            <tr key={item.id} className={item.checked ? "bg-gray-50" : ""}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => handleToggleCheck(item)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                  />
                                  <div className="ml-3">
                                    <div className={`text-sm font-medium ${item.checked ? "text-gray-400 line-through" : "text-gray-900"}`}>
                                      {item.name}
                                    </div>
                                    <div className="text-xs text-gray-500 flex items-center">
                                      <Tag size={12} className="mr-1" />
                                      {item.categoryId}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${item.checked ? "text-gray-400" : "text-gray-900"}`}>
                                ₱{item.price.toFixed(2)}
                              </td>
                              <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${item.checked ? "text-gray-400" : "text-gray-900"}`}>
                                {item.quantity}
                              </td>
                              <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${item.checked ? "text-gray-400" : "text-gray-900"}`}>
                                ₱{itemTotal.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex gap-3 justify-end">
                                  <button
                                    onClick={() => handleEditItem(item)}
                                    className="text-gray-400 hover:text-blue-500 transition"
                                    aria-label="Edit item"
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="text-gray-400 hover:text-red-500 transition"
                                    aria-label="Delete item"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-4/12 sticky top-4">
            {(showAddItemForm || editingItem) && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {editingItem ? 'Edit Item' : 'Add Item'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddItemForm(false);
                      setEditingItem(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    &times;
                  </button>
                </div>
                
                // In the onSave handler of the AddItemForm component
<AddItemForm 
  onCancel={() => {
    setShowAddItemForm(false);
    setEditingItem(null);
  }}
  initialItem={editingItem || undefined}
  onSave={(item) => {
    if (editingItem) {
      updateItem({ ...item, id: editingItem.id });
      toast.success('Item updated successfully');
    } else {
      addItem(item);
      toast.success('Item added successfully');
    }
    setShowAddItemForm(false);
    setEditingItem(null);
  }}
/>
              </div>
            )}
            
            {!showAddItemForm && !editingItem && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Shopping Summary</h2>
                
                {/* Keep the rest of the summary section unchanged */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListDetail;
