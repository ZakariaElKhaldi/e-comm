import { useState, useEffect, Fragment } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
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
  MagnifyingGlassIcon,
  TagIcon,
  ChatBubbleLeftIcon,
  CurrencyDollarIcon,
  TruckIcon,
  DocumentTextIcon,
  PlusIcon,
  UserIcon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';

// Types for better TypeScript support
type QuickAction = {
  name: string;
  path: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type NavigationItem = {
  name: string;
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  quickActions?: QuickAction[];
};

type NavigationGroup = {
  title: string;
  items: NavigationItem[];
};

// Extract navigation data to a separate file in a real app
const navigationGroups: NavigationGroup[] = [
  {
    title: "Main",
    items: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: Squares2X2Icon },
      { name: 'Analytics', path: '/admin/analytics', icon: ChartBarIcon },
    ]
  },
  {
    title: "Store Management",
    items: [
      {
        name: 'Products',
        path: '/admin/products',
        icon: ShoppingBagIcon,
        quickActions: [
          { name: 'Add Product', path: '/admin/products/create' },
          { name: 'Categories', path: '/admin/categories' },
          { name: 'Import Products', path: '/admin/products/import' },
        ]
      },
      { name: 'Categories', path: '/admin/categories', icon: FolderIcon },
      { name: 'Discounts', path: '/admin/discounts', icon: TagIcon },
    ]
  },
  {
    title: "Sales",
    items: [
      {
        name: 'Orders',
        path: '/admin/orders',
        icon: ClipboardDocumentListIcon,
        quickActions: [
          { name: 'Pending Orders', path: '/admin/orders?status=pending' },
          { name: 'Shipping', path: '/admin/shipping' },
        ]
      },
      { name: 'Customers', path: '/admin/customers', icon: UsersIcon },
      { name: 'Transactions', path: '/admin/transactions', icon: CurrencyDollarIcon },
    ]
  },
  {
    title: "Content",
    items: [
      { name: 'Reviews', path: '/admin/reviews', icon: ChatBubbleLeftIcon },
      { name: 'Pages', path: '/admin/pages', icon: DocumentTextIcon },
    ]
  },
  {
    title: "Configuration",
    items: [
      { name: 'Shipping', path: '/admin/shipping', icon: TruckIcon },
      { name: 'Settings', path: '/admin/settings', icon: Cog6ToothIcon },
    ]
  }
];

const quickActions: QuickAction[] = [
  { name: 'Add Product', path: '/admin/products/create', icon: ShoppingBagIcon },
  { name: 'Add Category', path: '/admin/categories/create', icon: FolderIcon },
  { name: 'Create Discount', path: '/admin/discounts/create', icon: TagIcon },
];

// Separate components for better organization
const SidebarNavItem = ({ item, isActive }: { item: NavigationItem; isActive: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(isActive);
  const Icon = item.icon;
  
  useEffect(() => {
    // Auto-expand active item
    if (isActive) setIsExpanded(true);
  }, [isActive]);

  return (
    <div className={`${isExpanded && item.quickActions ? 'mb-2' : ''}`}>
      <div className="flex items-center">
        <Link
          to={item.path}
          className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
            isActive
              ? 'bg-primary/10 text-primary'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
          aria-current={isActive ? 'page' : undefined}
        >
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-colors ${
              isActive ? 'bg-primary/20' : 'bg-gray-100 group-hover:bg-gray-200'
            }`}>
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
            </div>
            {item.name}
          </div>
          {item.quickActions && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsExpanded(!isExpanded);
              }}
              className={`w-5 h-5 flex items-center justify-center rounded-full ${
                isActive ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
              }`}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Collapse submenu' : 'Expand submenu'}
            >
              {isExpanded ? <ChevronDownIcon className="w-3 h-3" /> : '+'}
            </button>
          )}
        </Link>
      </div>
      
      {item.quickActions && (
        <Transition
          show={isExpanded}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 transform -translate-y-2"
          enterTo="opacity-100 transform translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 transform translate-y-0"
          leaveTo="opacity-0 transform -translate-y-2"
        >
          <div className="mt-1 ml-11 space-y-1">
            {item.quickActions.map((action) => (
              <Link
                key={action.name}
                to={action.path}
                className="block px-3 py-2 text-sm text-gray-500 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-150"
              >
                {action.name}
              </Link>
            ))}
          </div>
        </Transition>
      )}
    </div>
  );
};

const QuickActionsMenu = ({ 
  isOpen, 
  actions, 
  onSelectAction 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  actions: QuickAction[]; 
  onSelectAction: (path: string) => void; 
}) => {
  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 transform scale-95"
      enterTo="opacity-100 transform scale-100"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 transform scale-100"
      leaveTo="opacity-0 transform scale-95"
    >
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.name}
              onClick={() => onSelectAction(action.path)}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              {Icon && <Icon className="w-5 h-5 mr-3 text-gray-500" />}
              {action.name}
            </button>
          );
        })}
      </div>
    </Transition>
  );
};

const TopBar = ({ 
  isSidebarOpen, 
  toggleSidebar, 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  isQuickActionsOpen, 
  toggleQuickActions, 
  handleQuickAction 
}: { 
  isSidebarOpen: boolean; 
  toggleSidebar: () => void; 
  searchQuery: string; 
  setSearchQuery: (query: string) => void; 
  handleSearch: (e: React.FormEvent) => void; 
  isQuickActionsOpen: boolean; 
  toggleQuickActions: () => void; 
  handleQuickAction: (path: string) => void; 
}) => {
  return (
    <div className="bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>

        <div className="flex items-center gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-64 px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Search admin"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </form>

          {/* Quick Actions */}
          <div className="relative">
            <button
              onClick={toggleQuickActions}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Quick actions"
              aria-expanded={isQuickActionsOpen}
            >
              <PlusIcon className="w-6 h-6" />
            </button>
            <QuickActionsMenu
              isOpen={isQuickActionsOpen}
              onClose={toggleQuickActions}
              actions={quickActions}
              onSelectAction={handleQuickAction}
            />
          </div>

          {/* Notifications */}
          <button 
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50 relative"
            aria-label="Notifications"
          >
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Main component
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Close sidebar on mobile when navigating
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      if (!isLargeScreen) {
        setIsMobileSidebarOpen(false);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const toggleSidebar = () => {
    const isLargeScreen = window.innerWidth >= 1024;
    if (isLargeScreen) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    }
  };

  const toggleQuickActions = () => {
    setIsQuickActionsOpen(!isQuickActionsOpen);
  };

  const handleQuickAction = (path: string) => {
    navigate(path);
    setIsQuickActionsOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsQuickActionsOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${!isSidebarOpen && 'lg:-translate-x-full'}`}
        aria-label="Sidebar navigation"
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <Link to="/admin" className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Admin Panel</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-4" aria-label="Admin navigation">
            {navigationGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <SidebarNavItem
                      key={item.name}
                      item={item}
                      isActive={location.pathname === item.path}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="ml-3 flex-1">
                <div className="text-sm font-medium text-gray-700">Admin User</div>
                <div className="text-xs text-gray-500">admin@example.com</div>
              </div>
              <button 
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Account settings"
              >
                <Cog6ToothIcon className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
        } ${isMobileSidebarOpen ? 'pl-64' : 'pl-0'}`}
      >
        {/* Top Bar */}
        <TopBar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          isQuickActionsOpen={isQuickActionsOpen}
          toggleQuickActions={toggleQuickActions}
          handleQuickAction={handleQuickAction}
        />

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="bg-white p-4 text-center text-gray-500 text-sm border-t border-gray-100">
          <p>Admin Panel © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;