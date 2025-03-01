import { useState, useEffect } from 'react';
import { 
  TagIcon,
  FireIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Deal {
  id: string;
  name: string;
  brand: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  endDate: string;
  category: string;
  featured: boolean;
  stock: number;
}

const Deals = () => {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  // Mock deals data - in real app, this would come from an API
  const deals: Deal[] = [
    {
      id: 'helmet-deal-1',
      name: 'GT-Air II Helmet',
      brand: 'Shoei',
      image: 'https://placehold.co/600x400/252f3f/ffffff?text=GT-Air+II+Helmet',
      originalPrice: 599.99,
      discountedPrice: 479.99,
      discountPercentage: 20,
      endDate: '2024-03-25T00:00:00',
      category: 'Helmets',
      featured: true,
      stock: 5
    },
    {
      id: 'jacket-deal-1',
      name: 'Missile Leather Jacket',
      brand: 'Alpinestars',
      image: 'https://placehold.co/600x400/252f3f/ffffff?text=Missile+Jacket',
      originalPrice: 699.99,
      discountedPrice: 489.99,
      discountPercentage: 30,
      endDate: '2024-03-23T00:00:00',
      category: 'Jackets',
      featured: true,
      stock: 8
    },
    {
      id: 'boots-deal-1',
      name: 'SMX Plus v2 Boots',
      brand: 'Alpinestars',
      image: 'https://placehold.co/600x400/252f3f/ffffff?text=SMX+Plus+Boots',
      originalPrice: 299.99,
      discountedPrice: 239.99,
      discountPercentage: 20,
      endDate: '2024-03-24T00:00:00',
      category: 'Boots',
      featured: false,
      stock: 12
    }
  ];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const newTimeLeft: { [key: string]: string } = {};
      
      deals.forEach(deal => {
        const difference = new Date(deal.endDate).getTime() - new Date().getTime();
        
        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          
          newTimeLeft[deal.id] = `${days}d ${hours}h ${minutes}m`;
        } else {
          newTimeLeft[deal.id] = 'Expired';
        }
      });
      
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Hot Deals
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Limited time offers on premium motorcycle gear
          </p>
        </div>

        {/* Featured Deals */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FireIcon className="w-6 h-6 text-red-500" />
            Featured Deals
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {deals
              .filter(deal => deal.featured)
              .map(deal => (
                <div
                  key={deal.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-1/2">
                      <img
                        src={deal.image}
                        alt={deal.name}
                        className="w-full h-64 md:h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 bg-red-500 text-white text-lg font-bold rounded-full">
                          -{deal.discountPercentage}%
                        </span>
                      </div>
                    </div>
                    <div className="p-6 md:w-1/2">
                      <div className="text-sm text-gray-500 mb-1">
                        {deal.brand}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {deal.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-red-500">
                          ${deal.discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                          ${deal.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <ClockIcon className="w-5 h-5" />
                        <span>Ends in: {timeLeft[deal.id]}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-6">
                        Only {deal.stock} items left!
                      </div>
                      <button className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* All Deals */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TagIcon className="w-6 h-6 text-primary" />
            All Deals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {deals
              .filter(deal => !deal.featured)
              .map(deal => (
                <div
                  key={deal.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                        -{deal.discountPercentage}%
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-gray-500 mb-1">
                      {deal.brand}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {deal.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-red-500">
                        ${deal.discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${deal.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{timeLeft[deal.id]}</span>
                      </div>
                      <span>{deal.stock} left</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Empty State */}
        {deals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No active deals at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals; 