import { useState } from 'react';
import {
  StarIcon,
  ViewfinderCircleIcon,
  ShoppingCartIcon,
  HeartIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import ProductCard from '../components/products/ProductCard';

// Mock product data
const product = {
  id: '1',
  name: 'Premium Motorcycle Helmet',
  price: 299.99,
  description: 'High-quality motorcycle helmet with advanced safety features and superior comfort. Perfect for both city riding and long tours.',
  images: [
    'https://placehold.co/800x800/252f3f/ffffff?text=Helmet+Main+View',
    'https://placehold.co/800x800/252f3f/ffffff?text=Helmet+Side+View',
    'https://placehold.co/800x800/252f3f/ffffff?text=Helmet+Back+View',
    'https://placehold.co/800x800/252f3f/ffffff?text=Helmet+Interior',
  ],
  category: 'Helmets',
  features: [
    'DOT and ECE certified',
    'Advanced ventilation system',
    'Quick-release visor',
    'Removable and washable liner',
    'Bluetooth ready',
  ],
  sizes: ['S', 'M', 'L', 'XL'] as const,
  sizeGuide: {
    S: 'Head circumference: 55-56cm',
    M: 'Head circumference: 57-58cm',
    L: 'Head circumference: 59-60cm',
    XL: 'Head circumference: 61-62cm',
  },
  colors: ['Black', 'White', 'Red', 'Blue'] as const,
  rating: 4.5,
  reviewCount: 128,
  stock: {
    S: { Black: 5, White: 3, Red: 0, Blue: 2 },
    M: { Black: 8, White: 6, Red: 4, Blue: 5 },
    L: { Black: 3, White: 2, Red: 1, Blue: 0 },
    XL: { Black: 2, White: 0, Red: 3, Blue: 4 },
  } as const,
  reviews: [
    {
      id: 1,
      author: 'John D.',
      rating: 5,
      date: '2024-02-15',
      title: 'Excellent Protection and Comfort',
      comment: 'This helmet exceeds all my expectations. The ventilation is superb and it\'s very comfortable for long rides.',
      verified: true,
    },
    {
      id: 2,
      author: 'Sarah M.',
      rating: 4,
      date: '2024-02-10',
      title: 'Great Value for Money',
      comment: 'Very good quality helmet. The only minor issue is that it runs slightly small.',
      verified: true,
    },
  ],
};

type Size = typeof product.sizes[number];
type Color = typeof product.colors[number];

// Mock related products
const relatedProducts = Array.from({ length: 4 }, (_, i) => ({
  id: `related-${i + 1}`,
  name: `Related Product ${i + 1}`,
  price: Math.floor(Math.random() * 300) + 99.99,
  image: `https://placehold.co/600x600/252f3f/ffffff?text=Related+Product+${i + 1}`,
  category: 'Helmets',
  isNew: Math.random() > 0.8,
}));

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | ''>('');
  const [selectedColor, setSelectedColor] = useState<Color | ''>('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  const getStockStatus = (size: Size, color: Color) => {
    return product.stock[size][color];
  };

  const currentStock = selectedSize && selectedColor ? getStockStatus(selectedSize, selectedColor) : 0;

  const handleShare = (platform: 'facebook' | 'twitter' | 'email') => {
    const url = window.location.href;
    const text = `Check out this ${product.name}!`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${text}&body=${url}`);
        break;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <StarIcon
            key={index}
            className={`w-5 h-5 ${
              index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

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

            {/* Size Selection with Size Guide */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold">Size:</h2>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-primary flex items-center gap-1 text-sm"
                >
                  <ViewfinderCircleIcon className="w-4 h-4" />
                  Size Guide
                </button>
              </div>
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

            {/* Color Selection with Stock Status */}
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Color:</h2>
              <div className="flex gap-2">
                {product.colors.map((color) => {
                  const stock = selectedSize ? getStockStatus(selectedSize, color) : 0;
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      disabled={stock === 0}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedColor === color
                          ? 'border-primary text-primary'
                          : stock === 0
                          ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
                          : 'border-gray-300'
                      }`}
                    >
                      {color}
                      {selectedSize && (
                        <span className="block text-xs mt-1">
                          {stock === 0 ? 'Out of Stock' : `${stock} in stock`}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stock Status */}
            {selectedSize && selectedColor && (
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  {currentStock > 0 ? (
                    <>
                      <CheckIcon className="w-5 h-5 text-green-500" />
                      <span className="text-green-500">
                        In Stock ({currentStock} available)
                      </span>
                    </>
                  ) : (
                    <>
                      <XMarkIcon className="w-5 h-5 text-red-500" />
                      <span className="text-red-500">Out of Stock</span>
                    </>
                  )}
                </div>
              </div>
            )}

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

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                disabled={currentStock === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full ${
                  currentStock > 0
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCartIcon className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 rounded-full hover:bg-primary hover:text-white">
                <HeartIcon className="w-5 h-5" />
                Add to Wishlist
              </button>
            </div>

            {/* Social Sharing */}
            <div className="flex items-center gap-4 mb-8 pt-4 border-t">
              <span className="text-gray-600">Share:</span>
              <button
                onClick={() => handleShare('facebook')}
                className="text-blue-600 hover:text-blue-800"
              >
                Facebook
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="text-blue-400 hover:text-blue-600"
              >
                Twitter
              </button>
              <button
                onClick={() => handleShare('email')}
                className="text-gray-600 hover:text-gray-800"
              >
                Email
              </button>
            </div>

            {/* Tabs for Description and Reviews */}
            <div className="mt-12 border-t">
              <div className="flex gap-8 border-b">
                <button
                  className={`py-4 px-2 -mb-px ${
                    activeTab === 'description'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('description')}
                >
                  Description & Features
                </button>
                <button
                  className={`py-4 px-2 -mb-px ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews ({product.reviewCount})
                </button>
              </div>

              <div className="py-8">
                {activeTab === 'description' ? (
                  <div>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    <h3 className="font-semibold mb-4">Key Features:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.author}</span>
                            {review.verified && (
                              <span className="text-green-500 text-sm">Verified Purchase</span>
                            )}
                          </div>
                          <span className="text-gray-500 text-sm">{review.date}</span>
                        </div>
                        {renderStars(review.rating)}
                        <h4 className="font-medium mt-2">{review.title}</h4>
                        <p className="text-gray-600 mt-2">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Size Guide Modal */}
        {showSizeGuide && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Size Guide</h3>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                {Object.entries(product.sizeGuide).map(([size, guide]) => (
                  <div key={size} className="flex justify-between py-2 border-b">
                    <span className="font-medium">{size}</span>
                    <span className="text-gray-600">{guide}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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