import { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';

interface Transaction {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  date: string;
}

const Transactions = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      orderId: 'ORD-001',
      customerName: 'John Doe',
      amount: 299.99,
      status: 'completed',
      paymentMethod: 'Credit Card',
      date: '2024-02-28'
    },
    {
      id: '2',
      orderId: 'ORD-002',
      customerName: 'Jane Smith',
      amount: 149.99,
      status: 'pending',
      paymentMethod: 'PayPal',
      date: '2024-02-27'
    },
    // Add more mock transactions as needed
  ]);

  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage all transaction records
          </p>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Transaction ID</th>
                  <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Order ID</th>
                  <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                  <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Payment Method</th>
                  <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                      {transaction.orderId}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                      {transaction.customerName}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                      {transaction.paymentMethod}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => console.log('View transaction:', transaction.id)}
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions; 