import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (updates: { name?: string; photoURL?: string }) => Promise<void>;
  deleteAccount: () => Promise<void>;
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
      const validUser = users.find((u: User) => u.email === user.email);
      if (validUser) {
        setCurrentUser(validUser);
        setIsAuthenticated(true);
        if (!localStorage.getItem(`shopwise_lists_${validUser.id}`)) {
          localStorage.setItem(`shopwise_lists_${validUser.id}`, '[]');
        }
        return;
      }
    }

    const isAuthRoute = ['/login', '/register', '/'].some(path => 
      location.pathname.includes(path)
    );
    
    if (!isAuthRoute) navigate('/login', { replace: true });
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
      password,
      photoURL: ''
    };

    localStorage.setItem('shopwise_users', JSON.stringify([...users, user]));
    localStorage.setItem('shopwise_user', JSON.stringify(user));
    localStorage.setItem(`shopwise_lists_${user.id}`, '[]');
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

  const updateProfile = async (updates: { name?: string; photoURL?: string }) => {
    if (!currentUser) return;

    const users: User[] = JSON.parse(localStorage.getItem('shopwise_users') || '[]');
    const updatedUser = {
      ...currentUser,
      name: updates.name || currentUser.name,
      photoURL: updates.photoURL || currentUser.photoURL
    };

    const updatedUsers = users.map(u => 
      u.id === currentUser.id ? updatedUser : u
    );

    localStorage.setItem('shopwise_users', JSON.stringify(updatedUsers));
    localStorage.setItem('shopwise_user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  };

  const deleteAccount = async () => {
    if (!currentUser) return;

    const users: User[] = JSON.parse(localStorage.getItem('shopwise_users') || '[]');
    const updatedUsers = users.filter(u => u.id !== currentUser.id);

    localStorage.setItem('shopwise_users', JSON.stringify(updatedUsers));
    localStorage.removeItem('shopwise_user');
    localStorage.removeItem(`shopwise_lists_${currentUser.id}`);
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      login, 
      register, 
      logout, 
      isAuthenticated,
      updateProfile,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthStateManager>{children}</AuthStateManager>;
};
