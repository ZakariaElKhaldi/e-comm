import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const stats = [
    {
      label: 'Total Sales',
      value: '$12,345',
      change: '+12%',
      isPositive: true,
      icon: CurrencyDollarIcon
    },
    {
      label: 'Orders',
      value: '156',
      change: '+8%',
      isPositive: true,
      icon: ShoppingBagIcon
    },
    {
      label: 'Customers',
      value: '1,245',
      change: '+15%',
      isPositive: true,
      icon: UsersIcon
    },
    {
      label: 'Avg. Order Value',
      value: '$79.99',
      change: '-2%',
      isPositive: false,
      icon: ChartBarIcon
    }
  ];

  const recentOrders = [
    {
      id: '#12345',
      customer: 'John Doe',
      date: '2024-02-28',
      amount: '$299.99',
      status: 'Delivered'
    },
    {
      id: '#12344',
      customer: 'Jane Smith',
      date: '2024-02-28',
      amount: '$199.99',
      status: 'Processing'
    },
    {
      id: '#12343',
      customer: 'Mike Johnson',
      date: '2024-02-27',
      amount: '$399.99',
      status: 'Shipped'
    },
    {
      id: '#12342',
      customer: 'Sarah Williams',
      date: '2024-02-27',
      amount: '$149.99',
      status: 'Pending'
    }
  ];

  const lowStockProducts = [
    {
      id: '1',
      name: 'Premium Leather Jacket',
      stock: 3,
      threshold: 5
    },
    {
      id: '2',
      name: 'Full-Face Helmet',
      stock: 2,
      threshold: 5
    },
    {
      id: '3',
      name: 'Riding Gloves',
      stock: 4,
      threshold: 5
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200">
          <ArrowPathIcon className="w-5 h-5" />
          <span className="text-sm">Refresh Data</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className={`flex items-center gap-1 ${
                  stat.isPositive ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.isPositive ? (
                    <ArrowUpIcon className="w-4 h-4" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{order.customer}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{order.date}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{order.amount}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Processing'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'Shipped'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Low Stock Alert</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Stock: <span className="text-red-600 font-medium">{product.stock}</span> / Threshold: {product.threshold}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white text-red-600 rounded-lg border border-red-200 hover:bg-red-50 transition-colors duration-200">
                    Restock
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 