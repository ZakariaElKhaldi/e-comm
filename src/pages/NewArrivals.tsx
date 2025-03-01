import { useState } from 'react';
import { 
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  isNew: boolean;
  dateAdded: string;
}

const NewArrivals = () => {
  const [sortBy, setSortBy] = useState<'date' | 'price-low' | 'price-high' | 'rating'>('date');
  const [showFilters, setShowFilters] = useState(false);

  // Mock products data - in real app, this would come from an API
  const products: Product[] = [
    {
      id: 'helmet-1',
      name: 'X-14 Racing Helmet',
      brand: 'Shoei',
      image: 'https://placehold.co/600x400/252f3f/ffffff?text=X-14+Racing+Helmet',
      price: 799.99,
      rating: 4.8,
      reviews: 24,
      category: 'Helmets',
      isNew: true,
      dateAdded: '2024-03-15'
    },
    {
      id: 'jacket-1',
      name: 'GP Pro v3 Leather Jacket',
      brand: 'Alpinestars',
      image: 'https://placehold.co/600x400/252f3f/ffffff?text=GP+Pro+Jacket',
      price: 599.99,
      rating: 4.9,
      reviews: 16,
      category: 'Jackets',
      isNew: true,
      dateAdded: '2024-03-14'
    },
    {
      id: 'gloves-1',
      name: 'Carbon 3 Short Gloves',
      brand: 'Dainese',
      image: 'https://placehold.co/600x400/252f3f/ffffff?text=Carbon+3+Gloves',
      price: 129.99,
      rating: 4.7,
      reviews: 31,
      category: 'Gloves',
      isNew: true,
      dateAdded: '2024-03-13'
    },
    // Add more products as needed
  ];

  // Sort products based on selected criteria
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index}>
        {index < Math.floor(rating) ? (
          <StarIconSolid className="w-4 h-4 text-yellow-400" />
        ) : (
          <StarIcon className="w-4 h-4 text-gray-300" />
        )}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            New Arrivals
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check out our latest gear and equipment
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-500" />
            <span>Filters</span>
          </button>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="date">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 bg-primary text-white text-sm font-medium rounded-full">
                    New
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="text-sm text-gray-500 mb-1">
                  {product.brand}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No new products available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivals; 