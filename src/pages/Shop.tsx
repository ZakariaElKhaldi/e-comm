import { useState } from 'react';
import { 
  Squares2X2Icon as ViewGridIcon,
  Bars4Icon as ViewListIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import ProductCard from '../components/products/ProductCard';
import ProductList from '../components/products/ProductList';
import EmptyState from '../components/ui/EmptyState';

// Mock products data
const products = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 300) + 99.99,
  image: `https://placehold.co/600x600/252f3f/ffffff?text=Product+${i + 1}`,
  category: ['Helmets', 'Jackets', 'Gloves', 'Boots'][Math.floor(Math.random() * 4)],
  brand: ['Alpinestars', 'Dainese', 'Shoei', 'AGV'][Math.floor(Math.random() * 4)],
  rating: Math.floor(Math.random() * 5) + 1,
  reviews: Math.floor(Math.random() * 100),
  isNew: Math.random() > 0.8,
  isOnSale: Math.random() > 0.8,
  discount: Math.floor(Math.random() * 30) + 10,
}));

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [availability, setAvailability] = useState<'all' | 'in-stock' | 'sale'>('all');
  const [loading] = useState(false);
  const [error] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [totalPages] = useState(1);

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' ? true : product.category.toLowerCase() === selectedCategory;
      const matchesBrand = selectedBrand === 'all' ? true : product.brand === selectedBrand;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      const matchesSearch = searchQuery === '' ? true : 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating = selectedRating === 0 ? true : product.rating >= selectedRating;
      const matchesAvailability = availability === 'all' ? true :
        availability === 'sale' ? product.isOnSale :
        true; // For in-stock, we'll need actual stock data

      return matchesCategory && matchesBrand && matchesPrice && matchesSearch && 
             matchesRating && matchesAvailability;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return b.isNew ? 1 : -1;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (id: string) => {
    console.log('Added to cart:', id);
    // Here you would implement your cart logic
  };

  const handleAddToWishlist = (id: string) => {
    console.log('Added to wishlist:', id);
    // Here you would implement your wishlist logic
  };

  const handleQuickView = (id: string) => {
    console.log('Quick view:', id);
    // Here you would implement your quick view modal
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange({ min: 0, max: 500 });
    setSelectedRating(0);
    setAvailability('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Search and View Options Bar */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rating</option>
              </select>
              <div className="flex gap-2 border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                >
                  <ViewGridIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                >
                  <ViewListIcon className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden px-4 py-2 border rounded-lg flex items-center gap-2"
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className={`md:w-64 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
              <div className="flex justify-between items-center md:hidden">
                <h2 className="font-semibold">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h2 className="font-semibold mb-4">Categories</h2>
                <div className="space-y-2">
                  {['all', 'helmets', 'jackets', 'gloves', 'boots'].map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2"
                      />
                      <span className="capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h2 className="font-semibold mb-4">Brands</h2>
                <div className="space-y-2">
                  {['all', 'Alpinestars', 'Dainese', 'Shoei', 'AGV'].map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={selectedBrand === brand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="mr-2"
                      />
                      <span>{brand === 'all' ? 'All Brands' : brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h2 className="font-semibold mb-4">Price Range</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h2 className="font-semibold mb-4">Rating</h2>
                <div className="space-y-2">
                  {[0, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={selectedRating === rating}
                        onChange={(e) => setSelectedRating(Number(e.target.value))}
                        className="mr-2"
                      />
                      <span>{rating === 0 ? 'All Ratings' : `${rating}+ Stars`}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h2 className="font-semibold mb-4">Availability</h2>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Items' },
                    { value: 'in-stock', label: 'In Stock' },
                    { value: 'sale', label: 'On Sale' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="availability"
                        value={option.value}
                        checked={availability === option.value}
                        onChange={(e) => setAvailability(e.target.value as typeof availability)}
                        className="mr-2"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters Button */}
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} results
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {/* No results state */}
            {!loading && !error && filteredProducts.length === 0 && (
              <EmptyState
                icon={<MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />}
                title="No products found"
                description={
                  searchQuery
                    ? `No products match your search "${searchQuery}". Try adjusting your filters or search terms.`
                    : "No products match your selected filters. Try adjusting your criteria."
                }
                action={
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                  >
                    Clear All Filters
                  </button>
                }
              />
            )}

            {/* Products Display */}
            {!loading && !error && filteredProducts.length > 0 && (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
              }>
                {paginatedProducts.map((product) => (
                  viewMode === 'grid' ? (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onAddToCart={() => handleAddToCart(product.id)}
                      onAddToWishlist={() => handleAddToWishlist(product.id)}
                      onQuickView={() => handleQuickView(product.id)}
                    />
                  ) : (
                    <ProductList
                      key={product.id}
                      {...product}
                      onAddToCart={() => handleAddToCart(product.id)}
                      onAddToWishlist={() => handleAddToWishlist(product.id)}
                      onQuickView={() => handleQuickView(product.id)}
                    />
                  )
                ))}
              </div>
            )}

            {/* Enhanced Pagination */}
            {!loading && !error && filteredProducts.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center justify-between">
                  <div className="hidden sm:flex items-center gap-2">
                    <p className="text-sm text-gray-700">
                      Showing{' '}
                      <span className="font-medium">
                        {(currentPage - 1) * itemsPerPage + 1}
                      </span>{' '}
                      to{' '}
                      <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
                      </span>{' '}
                      of{' '}
                      <span className="font-medium">{filteredProducts.length}</span>{' '}
                      results
                    </p>
                  </div>

                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    {/* Previous Page */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        // Show first page, last page, current page, and pages around current page
                        return (
                          page === 1 ||
                          page === totalPages ||
                          Math.abs(page - currentPage) <= 1
                        );
                      })
                      .map((page, index, array) => {
                        // Add ellipsis if there are gaps
                        if (index > 0 && page - array[index - 1] > 1) {
                          return (
                            <span
                              key={`ellipsis-${page}`}
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                            >
                              ...
                            </span>
                          );
                        }

                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === page
                                ? 'z-10 bg-primary border-primary text-white'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}

                    {/* Next Page */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop; 