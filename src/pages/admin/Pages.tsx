import { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/24/outline';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  lastModified: string;
  author: string;
}

const Pages = () => {
  const [pages] = useState<Page[]>([
    {
      id: '1',
      title: 'About Us',
      slug: 'about-us',
      status: 'published',
      lastModified: '2024-02-28',
      author: 'John Doe'
    },
    {
      id: '2',
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      status: 'published',
      lastModified: '2024-02-27',
      author: 'Jane Smith'
    },
    {
      id: '3',
      title: 'Terms of Service',
      slug: 'terms-of-service',
      status: 'draft',
      lastModified: '2024-02-26',
      author: 'John Doe'
    }
  ]);

  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Pages Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create and manage static pages for your website
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
            onClick={() => console.log('Create new page')}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create Page
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Title</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Slug</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Modified</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Author</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {pages.map((page) => (
                    <tr key={page.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {page.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {page.slug}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            page.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {page.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {page.lastModified}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {page.author}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => console.log('Edit page:', page.id)}
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900"
                            onClick={() => console.log('View page:', page.id)}
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => console.log('Delete page:', page.id)}
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
  );
};

export default Pages; 