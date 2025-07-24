
// import { useContext, lazy, Suspense } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { AuthContext } from '@/contexts/AuthContext';
// import Navbar from '@/components/Navbar';
// import LoadingSpinner from '@/components/LoadingSpinner';

// // Lazy load page components
// const Register = lazy(() => import('./pages/Register'));
// const Login = lazy(() => import('./pages/Login'));
// const UserDashboard = lazy(() => import('./pages/UserDashboard'));
// const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
// const PublicPosts = lazy(() => import('./pages/PublicPosts'));

// function App() {
//   const { user } = useContext(AuthContext);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {user && <Navbar />}
//       <Suspense fallback={<LoadingSpinner className="min-h-screen" />}>
//         <Routes>
//           <Route path="/" element={<Navigate to="/public" />} />
//           <Route path="/public" element={<PublicPosts />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/dashboard"
//             element={user && user.role === 'user' ? <UserDashboard /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/admin"
//             element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
//           />
//         </Routes>
//       </Suspense>
//     </div>
//   );
// }

// export default App;

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
  const { user, isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated() && <Navbar />}
      <Suspense fallback={<LoadingSpinner className="min-h-screen" />}>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated() ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} /> : <Navigate to="/login" />}
          />
          <Route
            path="/public"
            element={isAuthenticated() ? <PublicPosts /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={!isAuthenticated() ? <Register /> : <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} />}
          />
          <Route
            path="/login"
            element={!isAuthenticated() ? <Login /> : <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated() && user.role === 'user' ? <UserDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={isAuthenticated() && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
