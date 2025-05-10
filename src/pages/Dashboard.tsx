import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { useList } from '../context/ListContext';
import { Calendar, CirclePlus, DollarSign, ShoppingBag } from 'lucide-react';

const Dashboard = () => {
  const { lists, setCurrentList } = useList();
  
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Montserrat:wght@700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate total spent for a list
  const calculateTotal = (listId: string) => {
    const list = lists.find(l => l.id === listId);
    if (!list) return 0;
    
    return list.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // Calculate budget status
  const getBudgetStatus = (listId: string) => {
    const list = lists.find(l => l.id === listId);
    if (!list) return { color: 'gray', text: 'Unknown' };
    
    const spent = calculateTotal(listId);
    const budget = list.budget;
    const percentage = (spent / budget) * 100;
    
    if (percentage >= 100) return { color: 'red', text: 'Over Budget' };
    if (percentage >= 80) return { color: 'yellow', text: 'Near Limit' };
    return { color: 'green', text: 'On Track' };
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            My Shopping Lists
          </h1>
          <Link
            to="/new-list"
            className="flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition hover:translate-y-[-1px] active:translate-y-[0px]"
          >
            <CirclePlus size={20} />
            New List
          </Link>
        </div>
        
        {lists.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-md p-8 text-center border border-white/50">
            <ShoppingBag className="mx-auto text-blue-400 mb-4" size={48} />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No shopping lists yet</h2>
            <p className="text-gray-500 mb-6">Create your first shopping list to start tracking your grocery budget</p>
            <Link
              to="/new-list"
              className="inline-flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition hover:translate-y-[-1px] active:translate-y-[0px]"
            >
              <CirclePlus size={20} />
              Create Shopping List
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map(list => {
              const budgetStatus = getBudgetStatus(list.id);
              const total = calculateTotal(list.id);
              const percentage = Math.min(100, Math.round((total / list.budget) * 100));
              
              return (
                <div key={list.id} className="bg-white/90 backdrop-blur-md rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-white/50 hover:translate-y-[-2px]">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{list.name}</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <Calendar size={16} />
                      <span>{formatDate(list.createdAt)}</span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Budget: ₱{list.budget.toFixed(2)}</span>
                        <span className="font-medium">
                          ₱{total.toFixed(2)} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            budgetStatus.color === 'green' ? 'bg-green-500' : 
                            budgetStatus.color === 'yellow' ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <DollarSign size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {list.items.length} items
                        </span>
                      </div>
                      <Link
                        to={`/list/${list.id}`}
                        className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition"
                        onClick={() => setCurrentList(list.id)}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
