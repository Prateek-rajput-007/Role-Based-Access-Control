import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/public" className="text-xl font-bold">Post System</Link>
        <div className="space-x-4">
          <Link to="/public">
            <Button variant="ghost">Approved Posts List</Button>
          </Link>
          <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
            <Button variant="ghost">{user.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}</Button>
          </Link>
          <Button variant="destructive" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;