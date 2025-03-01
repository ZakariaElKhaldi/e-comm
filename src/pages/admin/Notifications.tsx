import { useState } from 'react';
import { BellIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  date: string;
  read: boolean;
}

const Notifications = () => {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Order Received',
      message: 'Order #1234 has been placed successfully.',
      type: 'success',
      date: '2024-02-28 14:30',
      read: false
    },
    {
      id: '2',
      title: 'Low Stock Alert',
      message: 'Product "Wireless Headphones" is running low on stock.',
      type: 'warning',
      date: '2024-02-28 12:15',
      read: false
    },
    {
      id: '3',
      title: 'Payment Failed',
      message: 'Payment for order #1233 has failed. Customer has been notified.',
      type: 'error',
      date: '2024-02-28 10:45',
      read: true
    },
    {
      id: '4',
      title: 'System Update',
      message: 'System maintenance scheduled for tonight at 2 AM.',
      type: 'info',
      date: '2024-02-27 16:20',
      read: true
    }
  ]);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
      case 'error':
        return <ExclamationCircleIcon className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <ExclamationCircleIcon className="w-6 h-6 text-yellow-500" />;
      case 'info':
        return <InformationCircleIcon className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage your system notifications
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
            onClick={() => console.log('Mark all as read')}
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 hover:bg-gray-50 ${
                notification.read ? 'bg-white' : 'bg-blue-50'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${
                      notification.read ? 'text-gray-900' : 'text-gray-900'
                    }`}>
                      {notification.title}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{notification.date}</span>
                      {!notification.read && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                  <p className={`mt-1 text-sm ${
                    notification.read ? 'text-gray-500' : 'text-gray-900'
                  }`}>
                    {notification.message}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-full border border-transparent bg-gray-100 p-1.5 text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => console.log('Toggle read:', notification.id)}
                  >
                    <BellIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications; 