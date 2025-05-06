import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ListProvider } from './context/List-Context';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewList from './pages/NewList';
import ListDetail from './pages/ListDetail';
import './index.css';

// Protected route component that redirects to login if not authenticated
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

// Public route that redirects to dashboard if already authenticated
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Main App component with routes configuration
function AppRoutes() {
  return (
    <Routes>
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ListProvider>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </ListProvider>
    </AuthProvider>
  );
}

export default App;
