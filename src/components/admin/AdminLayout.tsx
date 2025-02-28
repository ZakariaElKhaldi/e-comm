import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Squares2X2Icon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  FolderIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  Bars3Icon,
  BellIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: Squares2X2Icon },
    { path: '/admin/products', label: 'Products', icon: ShoppingBagIcon },
    { path: '/admin/orders', label: 'Orders', icon: ClipboardDocumentListIcon },
    { path: '/admin/customers', label: 'Customers', icon: UsersIcon },
    { path: '/admin/categories', label: 'Categories', icon: FolderIcon },
    { path: '/admin/analytics', label: 'Analytics', icon: ChartBarIcon },
    { path: '/admin/settings', label: 'Settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Bars3Icon className="w-6 h-6 text-gray-600" />
            </button>
            <span className="text-xl font-bold text-gray-800">Admin Dashboard</span>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 gap-2 w-64">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none text-sm flex-1"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative"
              >
                <BellIcon className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {/* Example notifications */}
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm font-medium">New order received</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm font-medium">Low stock alert</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/" 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <HomeIcon className="w-6 h-6 text-gray-600" />
            </Link>

            {/* Admin Profile */}
            <div className="flex items-center gap-3 border-l pl-6">
              <img
                src="https://placehold.co/40x40/252f3f/ffffff?text=A"
                alt="Admin"
                className="w-9 h-9 rounded-lg object-cover"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <nav className="p-4 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  location.pathname === item.path
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon 
                  className={`w-6 h-6 transition-transform duration-200 ${
                    !isSidebarOpen ? 'group-hover:scale-110' : ''
                  }`}
                />
                {isSidebarOpen && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout; 