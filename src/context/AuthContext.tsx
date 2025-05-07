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
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else if (
      !location.pathname.includes('/login') &&
      !location.pathname.includes('/register') &&
      location.pathname !== '/'
    ) {
      navigate('/login', { replace: true });
    }
  }, [navigate, location.pathname]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed. Please try again.');
      }

      const data = await response.json();
      const user: User = {
        id: data.id,
        name: data.name,
        email: data.email,
      };

      localStorage.setItem('shopwise_user', JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthenticated(true);

      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, password_confirmation: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed. Please try again.');
      }

      const data = await response.json();
      const user: User = {
        id: data.id,
        name: data.name,
        email: data.email,
      };

      localStorage.setItem('shopwise_user', JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthenticated(true);

      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthStateManager>{children}</AuthStateManager>
);
