import { useState } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import CategoryForm from '../../components/admin/CategoryForm';

interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  image: string;
  slug: string;
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Helmets',
    description: 'Protective gear for your head',
    productCount: 24,
    image: 'https://placehold.co/200x200/252f3f/ffffff?text=Helmets',
    slug: 'helmets',
  },
  {
    id: '2',
    name: 'Jackets',
    description: 'Stylish and protective jackets',
    productCount: 36,
    image: 'https://placehold.co/200x200/252f3f/ffffff?text=Jackets',
    slug: 'jackets',
  },
  {
    id: '3',
    name: 'Gloves',
    description: 'Hand protection for riders',
    productCount: 18,
    image: 'https://placehold.co/200x200/252f3f/ffffff?text=Gloves',
    slug: 'gloves',
  },
];

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(category => category.id !== id));
    }
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleSubmit = (formData: Omit<Category, 'id' | 'productCount'>) => {
    if (selectedCategory) {
      // Update existing category
      setCategories(categories.map(category =>
        category.id === selectedCategory.id
          ? { ...category, ...formData }
          : category
      ));
    } else {
      // Add new category
      const newCategory: Category = {
        id: Math.random().toString(36).substr(2, 9),
        productCount: 0,
        ...formData,
      };
      setCategories([...categories, newCategory]);
    }
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <button
          onClick={() => {
            setSelectedCategory(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
                  >
                    <PencilIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
                  >
                    <TrashIcon className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {category.productCount} products
                </span>
                <button
                  onClick={() => handleEdit(category)}
                  className="text-primary hover:text-primary-dark text-sm"
                >
                  Edit Category
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <CategoryForm
          category={selectedCategory}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCategory(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Categories; 