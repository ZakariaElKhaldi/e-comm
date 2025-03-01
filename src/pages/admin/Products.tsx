import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  image: string;
}

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  // Mock products data
  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Leather Jacket',
      category: 'Jackets',
      price: 299.99,
      stock: 15,
      status: 'active',
      image: 'https://placehold.co/200x200/252f3f/ffffff?text=Jacket',
    },
    {
      id: '2',
      name: 'Full-Face Helmet',
      category: 'Helmets',
      price: 199.99,
      stock: 8,
      status: 'active',
      image: 'https://placehold.co/200x200/252f3f/ffffff?text=Helmet',
    },
    {
      id: '3',
      name: 'Racing Gloves',
      category: 'Gloves',
      price: 79.99,
      stock: 0,
      status: 'inactive',
      image: 'https://placehold.co/200x200/252f3f/ffffff?text=Gloves',
    },
  ];

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory) &&
      (filterStatus === 'all' || product.status === filterStatus)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'stock':
          return b.stock - a.stock;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Implement delete functionality
      console.log('Delete product:', id);
    }
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Export products');
  };

  const handleImport = () => {
    // Implement import functionality
    console.log('Import products');
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/admin/products/create')}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Product
          </button>
          <button
            onClick={handleImport}
            className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
            Import
          </button>
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white"
            >
              <option value="all">All Categories</option>
              <option value="helmets">Helmets</option>
              <option value="jackets">Jackets</option>
              <option value="gloves">Gloves</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-4 py-2 border rounded-lg bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'stock')}
              className="px-4 py-2 border rounded-lg bg-white"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="stock">Sort by Stock</option>
            </select>
            <div className="flex rounded-lg border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                <Squares2X2Icon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                <ListBulletIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                      className="p-2 bg-white rounded-full hover:bg-gray-100"
                    >
                      <PencilIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 bg-white rounded-full hover:bg-gray-100"
                    >
                      <TrashIcon className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-semibold">${product.price}</span>
                  <span className={`text-sm ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className={`text-sm px-2 py-1 rounded ${
                    product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {product.status}
                  </span>
                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="text-primary hover:text-primary-dark text-sm"
                  >
                    Edit Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover mr-3"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">${product.price}</td>
                  <td className="px-6 py-4">
                    <span className={product.stock > 0 ? 'text-green-500' : 'text-red-500'}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                        className="p-2 text-gray-600 hover:text-primary"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-600 hover:text-red-500"
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
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-50">Previous</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">1</button>
          <button className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-50">2</button>
          <button className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-50">3</button>
          <button className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Products; 