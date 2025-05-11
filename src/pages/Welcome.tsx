import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChartLine, Check, ChevronRight, DollarSign, ShoppingCart, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Welcome: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
    
    // Preload fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen font-['Inter'] bg-gradient-to-br from-indigo-50/50 to-blue-50/50 relative">
      {/* Background elements */}
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(ellipse_at_top_right,#e0e7ff_0%,#f0fdfa_50%,#e0e7ff_100%)] opacity-90" />
      <div className="fixed inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

      {/* Header */}
      <header className="py-6 px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg shadow-lg">
            <ShoppingCart className="text-white" size={24} aria-label="ShopWise logo" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent font-['Outfit']">
            ShopWise
          </h1>
        </div>
        <nav className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 text-indigo-600 font-medium hover:bg-white rounded-lg transition-all duration-300 focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium rounded-lg flex items-center gap-1
                     hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 focus:ring-2 focus:ring-white"
          >
            Get Started <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-8 py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-sm backdrop-blur-sm">
            <div className="p-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full">
              <Sparkles className="text-white" size={16} aria-hidden="true" />
            </div>
            <span className="text-sm font-medium text-indigo-800">Smart Budget Tracking</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-['Outfit']">
            Smart Grocery Shopping <br />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Starts Here
            </span>
          </h1>

          <ul className="space-y-3 text-gray-600 text-lg">
            <li className="flex items-center gap-2">
              <Check className="text-green-600" size={18} /> Real-time budget tracking
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-green-600" size={18} /> Categorized shopping lists
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-green-600" size={18} /> Historical spending insights
            </li>
          </ul>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg font-medium
                     hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-lg focus:ring-2 focus:ring-white"
          >
            Get Started <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Demo Card */}
        <div className="lg:w-1/2 bg-white/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/70">
          <div className="bg-white/80 p-6 rounded-xl shadow-sm mb-6">
            <h3 className="font-['Outfit'] font-semibold text-lg mb-4">Weekly Groceries</h3>
            <div className="space-y-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-gradient-to-r from-green-400 to-emerald-500" />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">₱90.45 Spent</span>
                <span className="text-emerald-600 font-medium">₱29.55 Remaining</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Check, color: 'indigo', title: 'Organize Lists', desc: 'Categorize items efficiently' },
              { icon: DollarSign, color: 'emerald', title: 'Budget Tracker', desc: 'Real-time spending updates' },
              { icon: ChartLine, color: 'purple', title: 'Shopping History', desc: 'Track spending patterns' },
              { icon: ShoppingCart, color: 'amber', title: 'Quick Add', desc: 'Instant item addition' }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-4 bg-white/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className={`w-8 h-8 bg-${feature.color}-100 rounded-full flex items-center justify-center mb-2`}>
                  <feature.icon className={`text-${feature.color}-600`} size={16} aria-hidden="true" />
                </div>
                <h4 className="font-['Outfit'] font-medium mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-violet-600 py-16 mt-20">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-['Outfit'] mb-6">
            Ready to Transform Your Shopping?
          </h2>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-lg font-medium
                     hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-lg focus:ring-2 focus:ring-indigo-500"
          >
            Start Free Trial <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="p-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg">
              <ShoppingCart className="text-white" size={20} aria-hidden="true" />
            </div>
            <span className="text-xl font-bold font-['Outfit']">ShopWise</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ShopWise. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
