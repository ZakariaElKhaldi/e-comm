import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  featured: boolean;
  categories: string[];
}

const Brands = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock brands data - in real app, this would come from an API
  const brands: Brand[] = [
    {
      id: 'alpinestars',
      name: 'Alpinestars',
      logo: 'https://placehold.co/400x100/252f3f/ffffff?text=Alpinestars',
      description: 'High-performance motorcycle gear and accessories',
      featured: true,
      categories: ['Gear', 'Apparel', 'Protection']
    },
    {
      id: 'shoei',
      name: 'Shoei',
      logo: 'https://placehold.co/400x100/252f3f/ffffff?text=Shoei',
      description: 'Premium motorcycle helmets and visors',
      featured: true,
      categories: ['Helmets']
    },
    {
      id: 'dainese',
      name: 'Dainese',
      logo: 'https://placehold.co/400x100/252f3f/ffffff?text=Dainese',
      description: 'Italian motorcycle clothing and protection',
      featured: true,
      categories: ['Gear', 'Protection']
    },
    {
      id: 'revit',
      name: 'REV\'IT!',
      logo: 'https://placehold.co/400x100/252f3f/ffffff?text=REV\'IT!',
      description: 'Adventure and urban motorcycle gear',
      featured: false,
      categories: ['Gear', 'Apparel']
    },
    {
      id: 'agv',
      name: 'AGV',
      logo: 'https://placehold.co/400x100/252f3f/ffffff?text=AGV',
      description: 'Racing and street motorcycle helmets',
      featured: true,
      categories: ['Helmets']
    },
    {
      id: 'icon',
      name: 'Icon',
      logo: 'https://placehold.co/400x100/252f3f/ffffff?text=Icon',
      description: 'Street-focused motorcycle gear and helmets',
      featured: false,
      categories: ['Gear', 'Helmets']
    }
  ];

  // Get unique categories from brands
  const categories = ['all', ...new Set(brands.flatMap(brand => brand.categories))];

  // Filter brands based on search and category
  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || brand.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Our Brands
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of premium motorcycle brands
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brands..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Brands */}
        {searchQuery === '' && selectedCategory === 'all' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Featured Brands
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands
                .filter(brand => brand.featured)
                .map(brand => (
                  <div
                    key={brand.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="h-12 object-contain mb-4"
                      />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {brand.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {brand.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {brand.categories.map(category => (
                          <span
                            key={category}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* All Brands */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {searchQuery || selectedCategory !== 'all' ? 'Search Results' : 'All Brands'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBrands.map(brand => (
              <div
                key={brand.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-10 object-contain mb-3"
                  />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {brand.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {brand.categories.map(category => (
                      <span
                        key={category}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBrands.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No brands found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Brands; 