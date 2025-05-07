import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper component to handle auth state at the provider level
const AuthStateManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing session on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('shopwise_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else if (
      !location.pathname.includes('/login') && 
      !location.pathname.includes('/register') && 
      location.pathname !== '/'
    ) {
      // If no auth and trying to access protected route, redirect to login
      navigate('/login', { replace: true });
    }
  }, [navigate, location.pathname]);

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll just simulate user authentication
    if (email && password) {
      const user: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
      };
      
      localStorage.setItem('shopwise_user', JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      // Redirect to dashboard after login
      navigate('/dashboard', { replace: true });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll just simulate user registration
    if (name && email && password) {
      const user: User = {
        id: Date.now().toString(),
        name,
        email,
      };
      
      localStorage.setItem('shopwise_user', JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      // Redirect to dashboard after registration
      navigate('/dashboard', { replace: true });
    } else {
      throw new Error('Invalid registration data');
    }
  };

  const logout = () => {
    localStorage.removeItem('shopwise_user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    
    // Clear any additional stored data on logout
    localStorage.removeItem('shopwise_lists');
    
    // Always navigate to welcome page on logout
    navigate('/', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Main provider that integrates with React Router
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthStateManager>{children}</AuthStateManager>;
};
