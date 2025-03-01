import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  CogIcon,
  ClipboardDocumentListIcon,
  MapPinIcon,
  CreditCardIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface AccountSection {
  id: string;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  link: string;
  count?: number;
}

const Account = () => {
  const [isAuthenticated] = useState(true); // Replace with actual auth state

  const sections: AccountSection[] = [
    {
      id: 'orders',
      title: 'My Orders',
      icon: ShoppingBagIcon,
      description: 'View and track your orders',
      link: '/account/orders',
      count: 2,
    },
    {
      id: 'wishlist',
      title: 'Wishlist',
      icon: HeartIcon,
      description: 'Products you\'ve saved',
      link: '/wishlist',
      count: 5,
    },
    {
      id: 'addresses',
      title: 'Addresses',
      icon: MapPinIcon,
      description: 'Manage your addresses',
      link: '/account/addresses',
    },
    {
      id: 'payment-methods',
      title: 'Payment Methods',
      icon: CreditCardIcon,
      description: 'Manage your payment methods',
      link: '/account/payment-methods',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: BellIcon,
      description: 'Manage your notifications',
      link: '/account/notifications',
      count: 3,
    },
    {
      id: 'settings',
      title: 'Account Settings',
      icon: CogIcon,
      description: 'Update your profile and preferences',
      link: '/account/settings',
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to access your account dashboard
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="/login"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign in
            </Link>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:text-primary-dark font-medium">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>
          <button
            onClick={() => console.log('Sign out')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-gray-400" />
            Sign Out
          </button>
        </div>

        {/* Account Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
              <UserIcon className="h-8 w-8 text-gray-500" />
            </div>
            <div className="ml-6">
              <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
              <p className="text-sm text-gray-600">john.doe@example.com</p>
              <p className="text-sm text-gray-600">Member since Jan 2024</p>
            </div>
          </div>
        </div>

        {/* Account Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.id}
              to={section.link}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {section.title}
                    </h3>
                    {section.count !== undefined && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary">
                        {section.count}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{section.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account; 