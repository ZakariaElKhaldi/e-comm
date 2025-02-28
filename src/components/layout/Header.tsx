import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm border-b border-gray-100">
          <div className="flex items-center gap-6 text-gray-500">
            <a href="tel:+1234567890" className="hover:text-primary">
              +1 (234) 567-890
            </a>
            <a href="mailto:info@laboutiquemoto.com" className="hover:text-primary">
              info@laboutiquemoto.com
            </a>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <Link to="/track-order" className="hover:text-primary">Track Order</Link>
            <Link to="/shipping" className="hover:text-primary">Shipping</Link>
            <Link to="/faq" className="hover:text-primary">FAQ</Link>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">
            LaBoutiqueMoto
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/categories" 
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Categories
            </Link>
            <Link 
              to="/new-arrivals" 
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              New Arrivals
            </Link>
            <Link 
              to="/deals" 
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Deals
            </Link>
            <Link 
              to="/brands" 
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Brands
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <MagnifyingGlassIcon className="w-6 h-6 text-gray-600" />
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="bg-transparent border-none focus:outline-none text-sm flex-1"
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link 
              to="/wishlist"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <HeartIcon className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white rounded-full text-xs flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Cart */}
            <Link 
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <ShoppingBagIcon className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white rounded-full text-xs flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Account */}
            <Link 
              to="/account"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <UserIcon className="w-6 h-6 text-gray-600" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/categories"
              className="block text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/new-arrivals"
              className="block text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link 
              to="/deals"
              className="block text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Deals
            </Link>
            <Link 
              to="/brands"
              className="block text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Brands
            </Link>
            <div className="pt-4 border-t border-gray-100">
              <Link 
                to="/track-order"
                className="block text-sm text-gray-500 hover:text-primary mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Track Order
              </Link>
              <Link 
                to="/shipping"
                className="block text-sm text-gray-500 hover:text-primary mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shipping
              </Link>
              <Link 
                to="/faq"
                className="block text-sm text-gray-500 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 