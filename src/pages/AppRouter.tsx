import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import FirstVisitSplash from './FirstVisitSplash';
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import NewList from './NewList';
import ListDetail from './ListDetail';
import Profile from './Profile';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export const AppRouter = () => {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(() => !localStorage.getItem('visited'));

  return (
    <>
      <AnimatePresence>
        {showSplash && <FirstVisitSplash onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PublicRoute>
              <Welcome />
            </PublicRoute>
          }/>
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }/>
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }/>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }/>
          <Route path="/new-list" element={
            <ProtectedRoute>
              <NewList />
            </ProtectedRoute>
          }/>
          <Route path="/list/:id" element={
            <ProtectedRoute>
              <ListDetail />
            </ProtectedRoute>
          }/>
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};
