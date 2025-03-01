import { useState } from 'react';
import { TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

const Wishlist = () => {
  const [wishlistItems] = useState<WishlistItem[]>([
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 199.99,
      image: '/images/products/headphones.jpg',
      inStock: true
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 299.99,
      image: '/images/products/smartwatch.jpg',
      inStock: true
    },
    {
      id: '3',
      name: 'Bluetooth Speaker',
      price: 149.99,
      image: '/images/products/speaker.jpg',
      inStock: false
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            My Wishlist
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Items you've saved for later
          </p>

          {wishlistItems.length === 0 ? (
            <div className="mt-16 text-center">
              <h3 className="text-lg font-medium text-gray-900">
                Your wishlist is empty
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Start adding items to your wishlist by browsing our products
              </p>
              <div className="mt-6">
                <a
                  href="/shop"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Browse Products
                </a>
              </div>
            </div>
          ) : (
            <div className="mt-12 space-y-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-6 shadow rounded-lg"
                >
                  <div className="flex items-center flex-1">
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="ml-4 text-lg font-medium text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className={`mt-1 text-sm ${
                        item.inStock ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </p>
                    </div>
                  </div>
                  <div className="ml-6 flex items-center space-x-4">
                    <button
                      type="button"
                      disabled={!item.inStock}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                        item.inStock
                          ? 'bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                      onClick={() => console.log('Add to cart:', item.id)}
                    >
                      <ShoppingCartIcon className="w-5 h-5 mr-2" />
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-900"
                      onClick={() => console.log('Remove from wishlist:', item.id)}
                    >
                      <TrashIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist; 