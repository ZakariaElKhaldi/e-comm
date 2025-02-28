import { useState } from 'react';
import ProductCard from '../components/products/ProductCard';

// Mock products data
const products = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 300) + 99.99,
  image: `https://placehold.co/600x600/252f3f/ffffff?text=Product+${i + 1}`,
  category: ['Helmets', 'Jackets', 'Gloves', 'Boots'][Math.floor(Math.random() * 4)],
  isNew: Math.random() > 0.8,
  isOnSale: Math.random() > 0.8,
  discount: Math.floor(Math.random() * 30) + 10,
}));

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products
    .filter(product => 
      selectedCategory === 'all' ? true : product.category.toLowerCase() === selectedCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return b.isNew ? 1 : -1;
        default:
          return 0;
      }
    });

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">All Products</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden px-4 py-2 border rounded-lg"
            >
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`md:w-64 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white p-6 rounded-lg shadow-sm">
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

              <h2 className="font-semibold mt-6 mb-4">Price Range</h2>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All' },
                  { value: '0-100', label: 'Under $100' },
                  { value: '100-200', label: '$100 - $200' },
                  { value: '200-plus', label: 'Over $200' },
                ].map((range) => (
                  <label key={range.value} className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value={range.value}
                      checked={priceRange === range.value}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="mr-2"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex gap-2">
                <button className="px-4 py-2 border rounded-lg bg-white">Previous</button>
                <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
                <button className="px-4 py-2 border rounded-lg bg-white">2</button>
                <button className="px-4 py-2 border rounded-lg bg-white">3</button>
                <button className="px-4 py-2 border rounded-lg bg-white">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop; 