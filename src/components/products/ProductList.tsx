import { HeartIcon, EyeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

interface ProductListProps {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isOnSale?: boolean;
  discount?: number;
  description?: string;
  tags?: string[];
  stock?: number;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
  onQuickView: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  id,
  name,
  price,
  image,
  brand,
  rating,
  reviews,
  isNew,
  isOnSale,
  discount,
  description,
  tags,
  stock,
  onAddToCart,
  onAddToWishlist,
  onQuickView
}: ProductListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 transition-shadow hover:shadow-md">
      <div className="flex gap-6">
        {/* Product Image */}
        <Link to={`/product/${id}`} className="relative w-48 h-48 flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
          />
          {isNew && (
            <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
              New
            </span>
          )}
          {isOnSale && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </Link>

        {/* Product Details */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <Link to={`/product/${id}`} className="block group">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary">
                {name}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 mt-1">{brand}</p>
            
            {/* Rating */}
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`w-4 h-4 ${
                      index < rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">({reviews} reviews)</span>
            </div>

            {/* Description */}
            {description && (
              <p className="text-gray-600 mt-2 line-clamp-2">{description}</p>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Price and Actions */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  ${price.toFixed(2)}
                </span>
                {isOnSale && discount !== undefined && (
                  <span className="text-sm text-gray-500 line-through">
                    ${(price / (1 - discount / 100)).toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {stock === 0 ? (
                  <span className="text-red-500">Out of Stock</span>
                ) : (
                  <span className="text-green-500">{stock} in stock</span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onAddToWishlist}
                className="p-2 text-gray-400 hover:text-primary rounded-full hover:bg-gray-100"
                title="Add to Wishlist"
              >
                <HeartIcon className="w-5 h-5" />
              </button>
              <button
                onClick={onQuickView}
                className="p-2 text-gray-400 hover:text-primary rounded-full hover:bg-gray-100"
                title="Quick View"
              >
                <EyeIcon className="w-5 h-5" />
              </button>
              <button
                onClick={onAddToCart}
                disabled={stock === 0}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  stock === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary-dark'
                }`}
              >
                <ShoppingCartIcon className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList; 