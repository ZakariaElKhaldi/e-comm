import { useState } from 'react';
import { StarIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Review {
  id: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'published' | 'pending' | 'rejected';
}

const Reviews = () => {
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      productName: 'Wireless Headphones',
      customerName: 'John Doe',
      rating: 4,
      comment: 'Great sound quality and comfortable to wear.',
      date: '2024-02-28',
      status: 'published'
    },
    {
      id: '2',
      productName: 'Smart Watch',
      customerName: 'Jane Smith',
      rating: 5,
      comment: 'Amazing features and battery life!',
      date: '2024-02-27',
      status: 'pending'
    },
    // Add more mock reviews as needed
  ]);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Reviews Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage customer reviews for your products
          </p>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Product</th>
                  <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                  <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Rating</th>
                  <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Comment</th>
                  <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reviews.map((review) => (
                  <tr key={review.id}>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                      {review.productName}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                      {review.customerName}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                      <div className="flex">{renderStars(review.rating)}</div>
                    </td>
                    <td className="py-4 px-3 text-sm text-gray-900 max-w-xs truncate">
                      {review.comment}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                      {review.date}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          review.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : review.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {review.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                      <div className="flex items-center space-x-3">
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => console.log('Edit review:', review.id)}
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => console.log('Delete review:', review.id)}
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
  );
};

export default Reviews; 