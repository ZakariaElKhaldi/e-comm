import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  ChevronDownIcon,
  PhoneIcon,
  EnvelopeIcon,
  TruckIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

// Type definitions
interface Category {
  name: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
  subcategories?: {
    name: string;
    path: string;
  }[];
  featured?: {
    name: string;
    path: string;
    image: string;
    price: number;
  }[];
}

interface NavItem {
  text: string;
  path: string;
  highlight?: boolean;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Detect scroll for sticky header and hide/show behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      // Update scroll position and header background
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchDropdownRef.current && 
        !searchDropdownRef.current.contains(event.target as Node) &&
        event.target instanceof Element &&
        !event.target.closest('button[data-search-trigger]')
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  // Handle search submission
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  }, [navigate, searchQuery]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Keyboard accessibility for ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsCategoryDropdownOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const categories: Category[] = [
    {
      name: 'Helmets',
      path: '/category/helmets',
      subcategories: [
        { name: 'Full Face', path: '/category/helmets/full-face' },
        { name: 'Modular', path: '/category/helmets/modular' },
        { name: 'Open Face', path: '/category/helmets/open-face' },
        { name: 'Off-Road', path: '/category/helmets/off-road' },
      ],
      featured: [
        {
          name: 'Premium Carbon Fiber Helmet',
          path: '/product/premium-carbon-helmet',
          image: 'https://placehold.co/200x200/252f3f/ffffff?text=Carbon+Helmet',
          price: 599.99
        },
        {
          name: 'Smart Bluetooth Helmet',
          path: '/product/smart-bluetooth-helmet',
          image: 'https://placehold.co/200x200/252f3f/ffffff?text=Smart+Helmet',
          price: 399.99
        }
      ]
    },
    {
      name: 'Jackets',
      path: '/category/jackets',
      subcategories: [
        { name: 'Leather', path: '/category/jackets/leather' },
        { name: 'Textile', path: '/category/jackets/textile' },
        { name: 'Mesh', path: '/category/jackets/mesh' },
        { name: 'Adventure', path: '/category/jackets/adventure' },
      ]
    },
    {
      name: 'Gloves',
      path: '/category/gloves',
      subcategories: [
        { name: 'Summer', path: '/category/gloves/summer' },
        { name: 'Winter', path: '/category/gloves/winter' },
        { name: 'Racing', path: '/category/gloves/racing' },
        { name: 'Touring', path: '/category/gloves/touring' },
      ]
    },
    {
      name: 'Boots',
      path: '/category/boots',
      subcategories: [
        { name: 'Street', path: '/category/boots/street' },
        { name: 'Racing', path: '/category/boots/racing' },
        { name: 'Adventure', path: '/category/boots/adventure' },
        { name: 'Touring', path: '/category/boots/touring' },
      ]
    },
    {
      name: 'Accessories',
      path: '/category/accessories',
      subcategories: [
        { name: 'Bluetooth Systems', path: '/category/accessories/bluetooth' },
        { name: 'Bags', path: '/category/accessories/bags' },
        { name: 'Protection', path: '/category/accessories/protection' },
        { name: 'Maintenance', path: '/category/accessories/maintenance' },
      ]
    }
  ];

  const navItems: NavItem[] = [
    { text: 'Shop', path: '/shop' },
    { text: 'New Arrivals', path: '/new-arrivals' },
    { text: 'Deals', path: '/deals', highlight: true },
    { text: 'Brands', path: '/brands' },
  ];

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-sm' 
          : 'bg-white/90 backdrop-blur-lg'
      } transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Top Mini Bar */}
      <div className="bg-gray-900 text-white py-1">
        <div className="container mx-auto px-4">
          <p className="text-xs text-center">Free Shipping on Orders Over $100 🏍️</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Main Navigation Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <span className="text-primary">La</span>BoutiqueMoto
          </Link>

          {/* Main Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Categories Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 py-2 hover:text-primary transition-colors group-hover:text-primary"
                aria-expanded={isCategoryDropdownOpen}
                aria-haspopup="true"
              >
                <span className="text-sm font-medium">Categories</span>
                <ChevronDownIcon className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>

              {/* Mega Menu - More Compact */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-5xl bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform -translate-y-1 group-hover:translate-y-0">
                <div className="grid grid-cols-4 gap-6 p-6">
                  {categories.map((category) => (
                    <div key={category.name} className="space-y-3">
                      <Link
                        to={category.path}
                        className="text-sm font-medium text-gray-900 hover:text-primary block"
                      >
                        {category.name}
                      </Link>
                      {category.subcategories && (
                        <ul className="space-y-2">
                          {category.subcategories.map((sub) => (
                            <li key={sub.name}>
                              <Link
                                to={sub.path}
                                className="text-xs text-gray-600 hover:text-primary block transition-colors"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                {/* Featured Section at Bottom */}
                <div className="bg-gray-50 p-4 rounded-b-lg">
                  <div className="flex items-center justify-between gap-4">
                    {categories[0].featured?.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center gap-3 group/item"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover/item:scale-105 transition-transform"
                          />
                        </div>
                        <div>
                          <h5 className="text-xs font-medium text-gray-900 group-hover/item:text-primary transition-colors">
                            {item.name}
                          </h5>
                          <p className="text-xs text-primary font-medium">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Other Navigation Items */}
            {navItems.map((item) => (
              <Link
                key={item.text}
                to={item.path}
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  item.highlight ? 'text-primary' : ''
                }`}
              >
                {item.text}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              data-search-trigger
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:text-primary transition-colors"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link 
              to="/wishlist"
              className="p-2 hover:text-primary transition-colors relative"
              aria-label="Wishlist"
            >
              <HeartIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white rounded-full text-[10px] flex items-center justify-center font-medium">
                0
              </span>
            </Link>

            {/* Cart */}
            <Link 
              to="/cart"
              className="p-2 hover:text-primary transition-colors relative"
              aria-label="Shopping cart"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white rounded-full text-[10px] flex items-center justify-center font-medium">
                0
              </span>
            </Link>

            {/* Account */}
            <Link 
              to="/account"
              className="p-2 hover:text-primary transition-colors"
              aria-label="My account"
            >
              <UserIcon className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-full bg-white shadow-lg transform transition-all duration-300">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`md:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div 
          className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h2 className="font-bold text-xl text-gray-900">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <XMarkIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="overflow-y-auto h-[calc(100%-60px)]">
            <nav className="p-4 space-y-6">
              {/* Search in Mobile Menu */}
              <div className="mb-4">
                <form onSubmit={handleSearch} className="flex items-center">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <button
                    type="submit"
                    className="ml-2 p-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                    aria-label="Search"
                  >
                    <MagnifyingGlassIcon className="w-5 h-5" />
                  </button>
                </form>
              </div>

              {/* Main Navigation */}
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between py-3 px-4 rounded-lg ${
                      item.highlight 
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.text}</span>
                    {item.highlight && (
                      <span className="text-xs font-medium bg-red-500 text-white px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Categories Section */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2 px-4">Categories</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Link 
                      key={category.path}
                      to={category.path}
                      className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link 
                    to="/categories"
                    className="flex items-center py-2 px-4 text-primary font-medium hover:bg-primary/5 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View All Categories
                  </Link>
                </div>
              </div>

              {/* Customer Service */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2 px-4">Customer Service</h3>
                <div className="space-y-1">
                  <Link 
                    to="/track-order"
                    className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <TruckIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Track Order
                  </Link>
                  <Link 
                    to="/shipping-info"
                    className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <TruckIcon className="w-5 h-5 mr-3 text-gray-500" />
                    Shipping Information
                  </Link>
                  <Link 
                    to="/faq"
                    className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <QuestionMarkCircleIcon className="w-5 h-5 mr-3 text-gray-500" />
                    FAQ
                  </Link>
                </div>
              </div>

              {/* Contact */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2 px-4">Contact Us</h3>
                <div className="space-y-1">
                  <a 
                    href="tel:+1234567890" 
                    className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <PhoneIcon className="w-5 h-5 mr-3 text-gray-500" />
                    +1 (234) 567-890
                  </a>
                  <a 
                    href="mailto:info@laboutiquemoto.com" 
                    className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <EnvelopeIcon className="w-5 h-5 mr-3 text-gray-500" />
                    info@laboutiquemoto.com
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;