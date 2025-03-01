import { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  TruckIcon, 
  CheckCircleIcon,
  ClockIcon,
  InboxIcon
} from '@heroicons/react/24/outline';

interface OrderStatus {
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
  description: string;
}

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  // Mock order data - in real app, this would come from an API
  const mockOrderDetails = {
    orderNumber: '#ORD-2024-1234',
    placedDate: '2024-03-15',
    status: 'shipped' as const,
    estimatedDelivery: '2024-03-20',
    timeline: [
      {
        status: 'processing',
        date: '2024-03-15 09:30 AM',
        description: 'Order received and processing initiated'
      },
      {
        status: 'confirmed',
        date: '2024-03-15 02:15 PM',
        description: 'Order confirmed and payment verified'
      },
      {
        status: 'shipped',
        date: '2024-03-16 10:45 AM',
        description: 'Package shipped via Express Delivery'
      }
    ] as OrderStatus[],
    items: [
      {
        name: 'Carbon Fiber Helmet',
        quantity: 1,
        price: 299.99
      },
      {
        name: 'Racing Gloves',
        quantity: 2,
        price: 49.99
      }
    ]
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
  };

  const getStatusColor = (status: OrderStatus['status']) => {
    switch (status) {
      case 'processing':
        return 'text-yellow-500';
      case 'confirmed':
        return 'text-blue-500';
      case 'shipped':
        return 'text-purple-500';
      case 'delivered':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-gray-600">
            Enter your order number to track your package
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleTrackOrder} className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Enter order number (e.g., ORD-2024-1234)"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center gap-2"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              Track
            </button>
          </div>
        </form>

        {isTracking && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Order Summary */}
            <div className="border-b pb-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {mockOrderDetails.orderNumber}
                  </h2>
                  <p className="text-gray-600">
                    Placed on {mockOrderDetails.placedDate}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${getStatusColor(mockOrderDetails.status)}`}>
                    {mockOrderDetails.status.charAt(0).toUpperCase() + mockOrderDetails.status.slice(1)}
                  </div>
                  <p className="text-gray-600">
                    Estimated Delivery: {mockOrderDetails.estimatedDelivery}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                {mockOrderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">
                        {item.quantity}x
                      </span>
                      <span className="text-gray-900">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Tracking Timeline
              </h3>
              <div className="relative">
                {mockOrderDetails.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4 pb-8 relative">
                    {/* Timeline line */}
                    {index < mockOrderDetails.timeline.length - 1 && (
                      <div className="absolute left-[1.3rem] top-8 w-0.5 h-full bg-gray-200" />
                    )}
                    
                    {/* Status icon */}
                    <div className={`relative z-10 rounded-full p-1 ${getStatusColor(event.status)} bg-white`}>
                      {event.status === 'processing' && <ClockIcon className="w-5 h-5" />}
                      {event.status === 'confirmed' && <CheckCircleIcon className="w-5 h-5" />}
                      {event.status === 'shipped' && <TruckIcon className="w-5 h-5" />}
                      {event.status === 'delivered' && <InboxIcon className="w-5 h-5" />}
                    </div>
                    
                    {/* Status details */}
                    <div>
                      <div className="font-medium text-gray-900">
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {event.date}
                      </div>
                      <div className="text-gray-600 mt-1">
                        {event.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder; 