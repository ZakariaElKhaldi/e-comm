import { Link } from 'react-router-dom';

const routes = [
  {
    title: 'Client Pages',
    links: [
      { to: '/', label: 'Home' },
      { to: '/categories', label: 'Categories' },
      { to: '/shop', label: 'Shop' },
      { to: '/product/1', label: 'Product Details (Example)' },
      { to: '/cart', label: 'Cart' },
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
    ]
  },
  {
    title: 'Admin Pages',
    links: [
      { to: '/admin', label: 'Admin Dashboard' },
      { to: '/admin/products', label: 'Products Management' },
      { to: '/admin/products/create', label: 'Create Product' },
      { to: '/admin/orders', label: 'Orders Management' },
    ]
  }
];

const DevNav = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.485 2.495c.873-1.562 3.157-1.562 4.03 0l6.28 11.25c.873 1.562-.217 3.505-2.015 3.505H4.22c-1.798 0-2.888-1.943-2.015-3.505l6.28-11.25zm.97 8.755a1 1 0 111.99 0 1 1 0 01-1.99 0zm1-3.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Development Navigation
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  This page is for development purposes only. Remove or protect this route before production deployment.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Development Navigation</h1>

        <div className="space-y-8">
          {routes.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
              <div className="grid gap-3">
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    to={link.to}
                    className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-700">{link.label}</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Current Environment: <span className="font-mono bg-gray-200 px-2 py-1 rounded">development</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevNav; 