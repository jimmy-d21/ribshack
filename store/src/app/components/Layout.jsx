import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { Home, ChefHat, Package, Menu as MenuIcon, Users, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, branch } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/kitchen', icon: ChefHat, label: 'Kitchen Display' },
    { path: '/inventory', icon: Package, label: 'Inventory' },
    { path: '/menu', icon: MenuIcon, label: 'Menu Management' },
    { path: '/staff', icon: Users, label: 'Staff Roster' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-orange-600 to-red-700 shadow-2xl flex flex-col">
        {/* Logo and Branch Header */}
        <div className="p-6 border-b border-orange-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">🍖</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Ribshack</h1>
              <p className="text-orange-100 text-sm font-medium">Store Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
                  isActive
                    ? 'bg-white text-orange-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t border-red-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-white hover:bg-white/10 rounded-xl transition-all font-semibold"
          >
            <LogOut className="size-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
