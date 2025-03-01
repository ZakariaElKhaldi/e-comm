import { useState } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  TagIcon,
  CalendarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usageCount: number;
  status: 'active' | 'expired' | 'scheduled';
  minimumPurchase?: number;
  description?: string;
  applicableProducts: 'all' | 'specific';
}

const mockDiscounts: Discount[] = [
  {
    id: '1',
    code: 'SUMMER2024',
    type: 'percentage',
    value: 20,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    usageLimit: 1000,
    usageCount: 0,
    status: 'scheduled',
    minimumPurchase: 50,
    description: 'Summer sale discount',
    applicableProducts: 'all',
  },
  {
    id: '2',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    usageLimit: 0,
    usageCount: 145,
    status: 'active',
    description: 'New customer discount',
    applicableProducts: 'all',
  },
  {
    id: '3',
    code: 'HELMETS25',
    type: 'fixed',
    value: 25,
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    usageLimit: 500,
    usageCount: 500,
    status: 'expired',
    minimumPurchase: 100,
    description: 'Helmets category discount',
    applicableProducts: 'specific',
  },
];

const Discounts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'expired' | 'scheduled'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDiscounts = mockDiscounts.filter(discount => {
    const matchesSearch = discount.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || discount.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Discount['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this discount?')) {
      console.log('Deleting discount:', id);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Discounts</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Discount
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search discounts..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'active' | 'expired' | 'scheduled')}
            className="px-4 py-2 border rounded-lg bg-white focus:ring-primary focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Discounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiscounts.map((discount) => (
          <div key={discount.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TagIcon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">{discount.code}</h3>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    getStatusColor(discount.status)
                  }`}>
                    {discount.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => console.log('Edit discount:', discount.id)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(discount.id)}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-gray-600">{discount.description}</p>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {discount.type === 'percentage' ? (
                    <span className="font-medium text-lg text-gray-900">{discount.value}% OFF</span>
                  ) : (
                    <span className="font-medium text-lg text-gray-900">${discount.value} OFF</span>
                  )}
                  {discount.minimumPurchase && (
                    <span className="text-sm text-gray-500">
                      (Min. purchase: ${discount.minimumPurchase})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CalendarIcon className="w-4 h-4" />
                  <span>
                    {new Date(discount.startDate).toLocaleDateString()} - {new Date(discount.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <UserGroupIcon className="w-4 h-4" />
                  <span>
                    {discount.usageCount} used
                    {discount.usageLimit > 0 && ` / ${discount.usageLimit} limit`}
                  </span>
                </div>

                <div className="text-sm text-gray-500">
                  Applicable to: {discount.applicableProducts === 'all' ? 'All products' : 'Specific products'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Create New Discount</h2>
              <p className="text-gray-500">Modal content will be implemented...</p>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discounts; 