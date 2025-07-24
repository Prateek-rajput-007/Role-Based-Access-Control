
import { useContext, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import LoadingSpinner from '@/components/LoadingSpinner';

// Lazy load page components
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const PublicPosts = lazy(() => import('./pages/PublicPosts'));

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">
      {user && <Navbar />}
      <Suspense fallback={<LoadingSpinner className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Navigate to="/public" />} />
          <Route path="/public" element={<PublicPosts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={user && user.role === 'user' ? <UserDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;