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

const AuthStateManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('shopwise_user');
    const users = JSON.parse(localStorage.getItem('shopwise_users') || '[]');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const validUser = users.find((u: User) => u.email === user.email && u.password === user.password);
      if (validUser) {
        setCurrentUser(validUser);
        setIsAuthenticated(true);
        return;
      }
    }

    if (!['/login', '/register', '/'].some(path => location.pathname.includes(path))) {
      navigate('/login', { replace: true });
    }
  }, [navigate, location.pathname]);

  const login = async (email: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem('shopwise_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) throw new Error('Invalid email or password');
    
    localStorage.setItem('shopwise_user', JSON.stringify(user));
    setCurrentUser(user);
    setIsAuthenticated(true);
    navigate('/dashboard', { replace: true });
  };

  const register = async (name: string, email: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem('shopwise_users') || '[]');
    
    if (users.some(u => u.email === email)) {
      throw new Error('Email already registered');
    }

    const user: User = {
      id: Date.now().toString(),
      name,
      email,
      password
    };

    localStorage.setItem('shopwise_users', JSON.stringify([...users, user]));
    localStorage.setItem('shopwise_user', JSON.stringify(user));
    setCurrentUser(user);
    setIsAuthenticated(true);
    navigate('/dashboard', { replace: true });
  };

  const logout = () => {
    localStorage.removeItem('shopwise_user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    navigate('/', { replace: true });
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
