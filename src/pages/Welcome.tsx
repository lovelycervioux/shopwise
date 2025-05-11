import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChartLine, Check, ChevronRight, DollarSign, ShoppingCart, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Welcome: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-100 to-indigo-100 opacity-90"></div>
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-indigo-50/50 to-blue-50/50"></div>
      <div className="fixed inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      
      {/* Header */}
      <header className="py-6 px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg shadow-lg">
            <ShoppingCart className="text-white" size={24} />
          </div>
          <span className="font-bold text-2xl gradient-text" style={{ fontFamily: "'Outfit', sans-serif" }}>ShopWise</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="py-2 px-4 rounded-lg text-indigo-600 font-medium hover:bg-white hover:shadow-sm transition duration-300">
            Login
          </Link>
          <Link to="/register" className="py-2 px-5 bg-gradient-primary text-white rounded-lg font-medium hover:shadow-md hover:translate-y-[-2px] active:translate-y-[0px] transition duration-300 flex items-center gap-1">
            <span>Get Started</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 rounded-full mb-6 shadow-sm backdrop-blur-sm">
            <div className="p-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full">
              <Sparkles className="text-white" size={14} />
            </div>
            <span className="text-sm font-medium text-indigo-800">Smart Budget Tracking</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Smart Grocery Shopping <span className="gradient-text">Starts Here</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Take control of your grocery budget with ShopWise. Create categorized lists, track spending in real-time, and never go over budget again.
          </p>
          <Link to="/register" className="group py-3 px-8 bg-gradient-primary text-white rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/20 hover:translate-y-[-2px] active:translate-y-[0px] transition duration-300 text-lg inline-flex items-center gap-2">
            Get Started
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="md:w-1/2 glass-card p-8 md:ml-10 shadow-xl">
          <div className="glass-card p-6 mb-6 border border-white/50">
            <h3 className="font-semibold mb-4 text-gray-800" style={{ fontFamily: "'Outfit', sans-serif" }}>Weekly Groceries</h3>
            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Budget</span>
              <span className="font-medium">₱120.00</span>
            </div>
            <div className="progress-bar">
              <div className="progress-green w-3/4"></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">Spent: ₱90.45</span>
              <span className="text-sm text-green-600 font-medium">Remaining: ₱29.55</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                <Check className="text-indigo-600" size={16} />
              </div>
              <h4 className="font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>Organize Lists</h4>
              <p className="text-sm text-gray-600">Categorize items for efficient shopping</p>
            </div>
            <div className="glass-card p-4 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                <DollarSign className="text-emerald-600" size={16} />
              </div>
              <h4 className="font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>Budget Tracker</h4>
              <p className="text-sm text-gray-600">Real-time spending updates</p>
            </div>
            <div className="glass-card p-4 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <ChartLine className="text-purple-600" size={16} />
              </div>
              <h4 className="font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>Shopping History</h4>
              <p className="text-sm text-gray-600">Track spending patterns</p>
            </div>
            <div className="glass-card p-4 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                <ShoppingCart className="text-amber-600" size={16} />
              </div>
              <h4 className="font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>Quick Add</h4>
              <p className="text-sm text-gray-600">Easily add items to your list</p>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-white/80 to-transparent"></div>
        <div className="container mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 rounded-full mb-4 shadow-sm">
              <span className="text-sm font-medium text-indigo-800">Smart Features</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 gradient-text" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Simplify Your Grocery Shopping
            </h2>
            <p className="text-gray-600 text-lg">
              Powerful tools to help you stay organized and under budget on every shopping trip
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 hover:shadow-lg hover:translate-y-[-4px] transition-all duration-300 border border-white/40">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center mb-6 -mt-10 -ml-2">
                <Check className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Categorized Lists</h3>
              <p className="text-gray-600 leading-relaxed">Organize items by predefined or custom categories for efficient shopping trips and better budget planning.</p>
            </div>
            
            <div className="glass-card p-8 hover:shadow-lg hover:translate-y-[-4px] transition-all duration-300 border border-white/40">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg flex items-center justify-center mb-6 -mt-10 -ml-2">
                <DollarSign className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Budget Management</h3>
              <p className="text-gray-600 leading-relaxed">Set budgets for each shopping list and track your spending in real-time with visual indicators of your budget status.</p>
            </div>
            
            <div className="glass-card p-8 hover:shadow-lg hover:translate-y-[-4px] transition-all duration-300 border border-white/40">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl shadow-lg flex items-center justify-center mb-6 -mt-10 -ml-2">
                <ChartLine className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Shopping Insights</h3>
              <p className="text-gray-600 leading-relaxed">Save and revisit past shopping lists to track spending patterns over time and make smarter purchasing decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-8 bg-gradient-primary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Ready to transform your shopping experience?
          </h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of smart shoppers who save money and time with ShopWise's powerful budget tracking tools.
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center gap-2 py-3 px-8 bg-white text-indigo-600 rounded-lg font-medium hover:shadow-xl hover:shadow-indigo-700/20 hover:translate-y-[-2px] active:translate-y-[0px] transition duration-300 text-lg"
          >
            Get Started For Free
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="p-1.5 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg">
                <ShoppingCart className="text-white" size={20} />
              </div>
              <span className="font-bold text-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>ShopWise</span>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ShopWise. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
