import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { House, LogOut, Menu, ShoppingCart, SquarePlus, User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navigation = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 shadow-md backdrop-blur-md border-b border-white/20' 
        : 'bg-white/70 backdrop-blur-sm border-b border-gray-200/70'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg shadow-md">
                <ShoppingCart className="text-white" size={20} />
              </div>
              <span className="font-bold text-xl gradient-text" style={{ fontFamily: "'Outfit', sans-serif" }}>
                ShopWise
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/dashboard') 
                      ? 'text-indigo-600 bg-indigo-50' 
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/80'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/new-list" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/new-list') 
                      ? 'text-indigo-600 bg-indigo-50' 
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/80'
                  }`}
                >
                  New List
                </Link>
                <div className="flex items-center ml-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full mr-3">
                    <User size={14} className="mr-1" />
                    <span className="text-sm font-medium">
                      {currentUser.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-full text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-3 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-md hover:translate-y-[-1px] active:translate-y-[0px] transition duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-4 space-y-1 px-4">
            {currentUser ? (
              <>
                <div className="px-3 py-3 border-b border-gray-200 mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Signed in as {currentUser.email}
                  </span>
                </div>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <House size={18} />
                  Dashboard
                </Link>
                <Link
                  to="/new-list"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <SquarePlus size={18} />
                  New List
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
