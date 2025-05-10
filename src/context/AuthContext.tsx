import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from './index';
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

const AuthStateManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('shopwise_user');
    const allUsers = JSON.parse(localStorage.getItem('shopwise_users') || '[]');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const validUser = allUsers.find((u: User) => u.email === parsedUser.email);
      if (validUser) {
        setCurrentUser(validUser);
        setIsAuthenticated(true);
      }
    }

    // Redirect if unauthenticated
    const isPublicRoute = ['/login', '/register', '/'].includes(location.pathname);
    if (!isPublicRoute && !validUser) {
      navigate('/login');
    }
  }, [navigate, location.pathname]);

  // Login function
  const login = async (email: string, password: string) => {
    const allUsers = JSON.parse(localStorage.getItem('shopwise_users') || '[]');
    const user = allUsers.find((u: User) => u.email === email && u.password === password);

    if (!user) throw new Error('Invalid email or password');
    
    localStorage.setItem('shopwise_user', JSON.stringify(user));
    setCurrentUser(user);
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  // Registration function
  const register = async (name: string, email: string, password: string) => {
    const allUsers = JSON.parse(localStorage.getItem('shopwise_users') || '[]');
    
    if (allUsers.some((u: User) => u.email === email)) {
      throw new Error('Email already registered');
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password
    };

    localStorage.setItem('shopwise_users', JSON.stringify([...allUsers, newUser]));
    localStorage.setItem('shopwise_user', JSON.stringify(newUser));
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  // Logout function
  const logout = () => {
    const userId = currentUser?.id;
    localStorage.removeItem('shopwise_user');
    if (userId) {
      // Clear user-specific data
      localStorage.removeItem(`shopwise_lists_${userId}`);
    }
    setCurrentUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthStateManager>{children}</AuthStateManager>;
};
