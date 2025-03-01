import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrashIcon,
  HeartIcon,
  ArrowPathIcon,
  ShoppingCartIcon,
  TagIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import ProductCard from '../components/products/ProductCard';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  color: string;
}

// Mock cart items
const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'X-Spirit III Helmet',
    price: 799.99,
    quantity: 1,
    image: 'https://placehold.co/400x400/252f3f/ffffff?text=X-Spirit+III',
    size: 'M',
    color: 'Black/Red',
  },
  {
    id: '2',
    name: 'Missile Leather Suit',
    price: 999.99,
    quantity: 1,
    image: 'https://placehold.co/400x400/252f3f/ffffff?text=Missile+Suit',
    size: '52',
    color: 'Black',
  },
  {
    id: '3',
    name: 'GP Tech v2 Gloves',
    price: 199.99,
    quantity: 2,
    image: 'https://placehold.co/400x400/252f3f/ffffff?text=GP+Tech+Gloves',
    size: 'L',
    color: 'Black/White',
  },
];

// Mock cross-sell recommendations based on cart items
const crossSellItems = [
  {
    id: 'cs1',
    name: 'Motorcycle Gloves',
    price: 49.99,
    image: 'https://placehold.co/600x600/252f3f/ffffff?text=Gloves',
    category: 'Gloves',
    isNew: true
  },
  {
    id: 'cs2',
    name: 'Bluetooth Intercom',
    price: 129.99,
    image: 'https://placehold.co/600x600/252f3f/ffffff?text=Intercom',
    category: 'Accessories',
    isOnSale: true,
    discount: 20
  },
  {
    id: 'cs3',
    name: 'Riding Boots',
    price: 159.99,
    image: 'https://placehold.co/600x600/252f3f/ffffff?text=Boots',
    category: 'Footwear'
  }
];

// Mock recently viewed items
const recentlyViewedItems = [
  {
    id: 'rv1',
    name: 'Motorcycle Pants',
    price: 149.99,
    image: 'https://placehold.co/600x600/252f3f/ffffff?text=Pants',
    category: 'Pants'
  },
  {
    id: 'rv2',
    name: 'Rain Cover',
    price: 29.99,
    image: 'https://placehold.co/600x600/252f3f/ffffff?text=Cover',
    category: 'Accessories'
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const saveForLater = (id: string) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      setSavedItems(prev => [...prev, item]);
      removeItem(id);
    }
  };

  const moveToCart = (id: string) => {
    const item = savedItems.find(item => item.id === id);
    if (item) {
      setCartItems(prev => [...prev, item]);
      setSavedItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handlePromoCode = () => {
    // Mock promo code validation
    if (promoCode.toLowerCase() === 'save10') {
      setPromoError('');
      // Apply discount logic here
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const discount = promoCode.toLowerCase() === 'save10' ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 && savedItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6">
              <ShoppingCartIcon className="w-full h-full text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items and Saved Items */}
            <div className="lg:col-span-2 space-y-8">
              {/* Active Cart Items */}
              {cartItems.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                  </div>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 border-b last:border-b-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600 text-sm">
                          Size: {item.size} | Color: {item.color}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 border rounded hover:bg-gray-50"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 border rounded hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => saveForLater(item.id)}
                              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                            >
                              <HeartIcon className="w-4 h-4" />
                              <span className="text-sm">Save for Later</span>
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 flex items-center gap-1"
                            >
                              <TrashIcon className="w-4 h-4" />
                              <span className="text-sm">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${item.price.toFixed(2)}</p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Saved Items */}
              {savedItems.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Saved for Later ({savedItems.length})</h2>
                  </div>
                  {savedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 border-b last:border-b-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600 text-sm">
                          Size: {item.size} | Color: {item.color}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <button
                            onClick={() => moveToCart(item.id)}
                            className="text-primary hover:text-primary-dark flex items-center gap-1"
                          >
                            <ShoppingCartIcon className="w-4 h-4" />
                            <span className="text-sm">Move to Cart</span>
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 space-y-6">
              {/* Summary Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button
                      onClick={handlePromoCode}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-red-500 text-sm mt-1">{promoError}</p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="block w-full bg-primary text-white py-3 rounded-full hover:bg-primary-dark transition text-center mb-3"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/shop"
                  className="block w-full text-center text-primary hover:text-primary-dark"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Shipping Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 text-green-600 mb-4">
                  <TruckIcon className="w-5 h-5" />
                  <span className="font-medium">Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-3 text-blue-600">
                  <TagIcon className="w-5 h-5" />
                  <span className="font-medium">Use code SAVE10 for 10% off</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cross-sell Recommendations */}
        {cartItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {crossSellItems.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        {recentlyViewedItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentlyViewedItems.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 