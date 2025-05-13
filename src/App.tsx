import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ListProvider } from './context/ListContext';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewList from './pages/NewList';
import ListDetail from './pages/ListDetail';
import Profile from './pages/Profile';
import { FirstVisitSplash } from './pages/FirstVisitSplash'; // Fixed import path
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

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PublicRoute>
            <Welcome />
          </PublicRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/new-list" element={
          <ProtectedRoute>
            <NewList />
          </ProtectedRoute>
        } />
        <Route path="/list/:id" element={
          <ProtectedRoute>
            <ListDetail />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <ListProvider>
        {/* Splash screen should be outside AnimatePresence */}
        <FirstVisitSplash />
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
