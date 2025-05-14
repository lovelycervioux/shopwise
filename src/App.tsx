// App.tsx
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ListProvider } from './context/ListContext';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewList from './pages/NewList';
import ListDetail from './pages/ListDetail';
import Profile from './pages/Profile';
import SplashAnimation from './pages/SplashAnimation';
import './index.css';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

function AppRoutes() {
  const location = useLocation();
  const { logout } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  // Handle logout and show splash
  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      setShowSplash(true);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setShowSplash(true);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashAnimation 
            onComplete={() => {
              setShowSplash(false);
              if (!localStorage.getItem('authToken')) {
                window.location.href = '/';
              }
            }}
            onSkip={() => {
              setShowSplash(false);
              if (!localStorage.getItem('authToken')) {
                window.location.href = '/';
              }
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PublicRoute>
              <Welcome onLogout={handleLogout} />
            </PublicRoute>
          } />
          {/* Other routes remain the same */}
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ListProvider>
        <AppRoutes />
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          toastStyle={{
            background: '#ffffff',
            color: '#1f2937',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          progressStyle={{ background: 'rgba(79, 70, 229, 0.2)' }}
        />
      </ListProvider>
    </AuthProvider>
  );
}

export default App;
