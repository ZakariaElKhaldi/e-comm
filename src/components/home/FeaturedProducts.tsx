import ProductCard from '../products/ProductCard';

// Temporary mock data - replace with actual data later
const mockProducts = [
  {
    id: '1',
    name: 'Premium Leather Motorcycle Jacket',
    price: 299.99,
    image: 'https://placehold.co/600x600/252f3f/ffffff?text=Leather+Jacket',
    category: 'Jackets',
    isNew: true,
  },
  {
    id: '2',
    name: 'Full-Face Helmet with Bluetooth',
    price: 399.99,
    image: 'https://placehold.co/600x600/252f3f/ffffff?text=Smart+Helmet',
    category: 'Helmets',
    isOnSale: true,
    discount: 15,
  },
  {
    id: '3',
    name: 'Reinforced Motorcycle Gloves',
    price: 79.99,
    image: 'https://placehold.co/600x600/252f3f/ffffff?text=Pro+Gloves',
    category: 'Gloves',
  },
  {
    id: '4',
    name: 'Waterproof Riding Boots',
    price: 189.99,
    image: 'https://placehold.co/600x600/252f3f/ffffff?text=Riding+Boots',
    category: 'Footwear',
    isNew: true,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium motorcycle gear and accessories,
            designed for both style and safety.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-block px-8 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 