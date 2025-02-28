import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Helmets',
    description: 'Premium safety helmets for all riding styles',
    image: 'https://placehold.co/600x400/252f3f/ffffff?text=Helmets',
    itemCount: 45
  },
  {
    id: 2,
    name: 'Jackets',
    description: 'Protective and stylish riding jackets',
    image: 'https://placehold.co/600x400/252f3f/ffffff?text=Jackets',
    itemCount: 32
  },
  {
    id: 3,
    name: 'Gloves',
    description: 'High-quality riding gloves for all seasons',
    image: 'https://placehold.co/600x400/252f3f/ffffff?text=Gloves',
    itemCount: 28
  },
  {
    id: 4,
    name: 'Boots',
    description: 'Durable and comfortable motorcycle boots',
    image: 'https://placehold.co/600x400/252f3f/ffffff?text=Boots',
    itemCount: 24
  },
  {
    id: 5,
    name: 'Pants',
    description: 'Protective riding pants and jeans',
    image: 'https://placehold.co/600x400/252f3f/ffffff?text=Pants',
    itemCount: 30
  },
  {
    id: 6,
    name: 'Accessories',
    description: 'Essential riding accessories and gear',
    image: 'https://placehold.co/600x400/252f3f/ffffff?text=Accessories',
    itemCount: 56
  }
];

const Categories = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of motorcycle gear and accessories,
            carefully categorized for your convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group block"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                <div className="relative aspect-[4/3]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-semibold">
                      View Collection
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-3">{category.description}</p>
                  <span className="text-sm text-primary">
                    {category.itemCount} Products
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories; 