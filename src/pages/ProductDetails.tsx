import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';

// Mock product data
const product = {
  id: '1',
  name: 'Premium Motorcycle Helmet',
  price: 299.99,
  description: 'High-quality motorcycle helmet with advanced safety features and superior comfort. Perfect for both city riding and long tours.',
  images: [
    'https://placehold.co/800x800/252f3f/ffffff?text=Main+Image',
    'https://placehold.co/800x800/252f3f/ffffff?text=Side+View',
    'https://placehold.co/800x800/252f3f/ffffff?text=Back+View',
    'https://placehold.co/800x800/252f3f/ffffff?text=Interior',
  ],
  category: 'Helmets',
  features: [
    'DOT and ECE certified',
    'Advanced ventilation system',
    'Quick-release visor',
    'Removable and washable liner',
    'Bluetooth ready',
  ],
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['Black', 'White', 'Red', 'Blue'],
  rating: 4.5,
  reviewCount: 128,
};

// Mock related products
const relatedProducts = Array.from({ length: 4 }, (_, i) => ({
  id: `related-${i + 1}`,
  name: `Related Product ${i + 1}`,
  price: Math.floor(Math.random() * 300) + 99.99,
  image: `https://placehold.co/600x600/252f3f/ffffff?text=Related+${i + 1}`,
  category: 'Helmets',
  isNew: Math.random() > 0.8,
}));

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-gray-600">({product.reviewCount} reviews)</span>
            </div>
            <p className="text-2xl font-bold text-primary mb-6">${product.price}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Key Features:</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Size:</h2>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize === size
                        ? 'border-primary text-primary'
                        : 'border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Color:</h2>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedColor === color
                        ? 'border-primary text-primary'
                        : 'border-gray-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Quantity:</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border rounded-lg"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border rounded-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-primary text-white py-3 rounded-full hover:bg-primary-dark transition mb-4">
              Add to Cart
            </button>
            <button className="w-full border-2 border-primary text-primary py-3 rounded-full hover:bg-primary hover:text-white transition">
              Add to Wishlist
            </button>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 