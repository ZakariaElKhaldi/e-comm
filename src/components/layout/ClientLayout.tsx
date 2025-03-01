import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const ClientLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const location = useLocation();

  // Don't show the shopping sidebar on these routes
  const hideShoppingSidebar = ['/cart', '/checkout', '/admin'].some(path => 
    location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Cart Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cart Content */}
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {/* Cart items will go here */}
            <p className="text-gray-500 text-center">Your cart is empty</p>
          </div>

          <div className="p-4 border-t">
            <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Wishlist Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isWishlistOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Wishlist Content */}
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Wishlist</h2>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {/* Wishlist items will go here */}
            <p className="text-gray-500 text-center">Your wishlist is empty</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClientLayout; 