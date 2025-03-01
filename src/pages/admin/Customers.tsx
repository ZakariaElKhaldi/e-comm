import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: 'active' | 'inactive';
  avatar: string;
}

// Mock customers data
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    totalOrders: 12,
    totalSpent: 2499.99,
    lastOrder: '2024-02-15',
    status: 'active',
    avatar: 'https://placehold.co/100x100/252f3f/ffffff?text=JD',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 (555) 234-5678',
    totalOrders: 8,
    totalSpent: 1899.99,
    lastOrder: '2024-02-10',
    status: 'active',
    avatar: 'https://placehold.co/100x100/252f3f/ffffff?text=JS',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1 (555) 345-6789',
    totalOrders: 5,
    totalSpent: 899.99,
    lastOrder: '2024-01-25',
    status: 'inactive',
    avatar: 'https://placehold.co/100x100/252f3f/ffffff?text=MJ',
  },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'orders' | 'spent'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter and sort customers
  const filteredCustomers = mockCustomers
    .filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const sortMultiplier = sortOrder === 'asc' ? 1 : -1;
      switch (sortBy) {
        case 'orders':
          return (a.totalOrders - b.totalOrders) * sortMultiplier;
        case 'spent':
          return (a.totalSpent - b.totalSpent) * sortMultiplier;
        default:
          return a.name.localeCompare(b.name) * sortMultiplier;
      }
    });

  const handleSort = (field: 'name' | 'orders' | 'spent') => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleExport = () => {
    // TODO: Implement CSV export
    console.log('Exporting customers data...');
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          Export
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
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-4 py-2 border rounded-lg bg-white focus:ring-primary focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <FunnelIcon className="w-5 h-5" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('orders')}>
                  <div className="flex items-center gap-2">
                    Orders
                    <ChevronDownIcon className={`w-4 h-4 transition-transform ${
                      sortBy === 'orders' && sortOrder === 'desc' ? 'rotate-180' : ''
                    }`} />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('spent')}>
                  <div className="flex items-center gap-2">
                    Total Spent
                    <ChevronDownIcon className={`w-4 h-4 transition-transform ${
                      sortBy === 'spent' && sortOrder === 'desc' ? 'rotate-180' : ''
                    }`} />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">Customer ID: {customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <EnvelopeIcon className="w-4 h-4" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <PhoneIcon className="w-4 h-4" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.totalOrders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(customer.lastOrder).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      customer.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">{filteredCustomers.length}</span> of{' '}
              <span className="font-medium">{mockCustomers.length}</span> results
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                1
              </button>
              <button className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers; 