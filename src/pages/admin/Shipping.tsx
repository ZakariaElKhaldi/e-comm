import { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

interface ShippingZone {
  id: string;
  name: string;
  regions: string[];
  methods: ShippingMethod[];
}

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  minDeliveryDays: number;
  maxDeliveryDays: number;
  active: boolean;
}

const Shipping = () => {
  const [shippingZones] = useState<ShippingZone[]>([
    {
      id: '1',
      name: 'Domestic Shipping',
      regions: ['United States', 'Canada'],
      methods: [
        {
          id: '1',
          name: 'Standard Shipping',
          price: 5.99,
          minDeliveryDays: 3,
          maxDeliveryDays: 5,
          active: true,
        },
        {
          id: '2',
          name: 'Express Shipping',
          price: 14.99,
          minDeliveryDays: 1,
          maxDeliveryDays: 2,
          active: true,
        },
      ],
    },
    {
      id: '2',
      name: 'International Shipping',
      regions: ['Europe', 'Asia'],
      methods: [
        {
          id: '3',
          name: 'International Standard',
          price: 19.99,
          minDeliveryDays: 7,
          maxDeliveryDays: 14,
          active: true,
        },
      ],
    },
  ]);

  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Shipping Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage shipping zones and delivery methods
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
            onClick={() => console.log('Add shipping zone')}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Shipping Zone
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {shippingZones.map((zone) => (
          <div key={zone.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-gray-900">{zone.name}</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Regions: {zone.regions.join(', ')}
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  className="text-blue-600 hover:text-blue-900"
                  onClick={() => console.log('Edit zone:', zone.id)}
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => console.log('Delete zone:', zone.id)}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium text-gray-900">Shipping Methods</h3>
                <button
                  className="inline-flex items-center text-sm text-primary hover:text-primary-dark"
                  onClick={() => console.log('Add method to zone:', zone.id)}
                >
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Add Method
                </button>
              </div>

              <div className="flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Method</th>
                          <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Price</th>
                          <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Delivery Time</th>
                          <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Status</th>
                          <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {zone.methods.map((method) => (
                          <tr key={method.id}>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                              {method.name}
                            </td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                              ${method.price.toFixed(2)}
                            </td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                              {method.minDeliveryDays}-{method.maxDeliveryDays} days
                            </td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm">
                              <span
                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                  method.active
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {method.active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                              <div className="flex space-x-3">
                                <button
                                  className="text-blue-600 hover:text-blue-900"
                                  onClick={() => console.log('Edit method:', method.id)}
                                >
                                  <PencilIcon className="w-5 h-5" />
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => console.log('Delete method:', method.id)}
                                >
                                  <TrashIcon className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shipping; 