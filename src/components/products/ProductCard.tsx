import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, EyeIcon, ShoppingCartIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  isOnSale?: boolean;
  discount?: number;
  onAddToCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
  onQuickView?: (id: string) => void;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  rating,
  reviews,
  isNew = false,
  isOnSale = false,
  discount = 0,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountedPrice = isOnSale ? price - (price * discount) / 100 : price;

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    onQuickView?.(id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    onAddToCart?.(id);
  };

  return (
    <Link 
      to={`/product/${id}`} 
      className="block group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-labelledby={`product-${id}-title`}
    >
      {/* Product Image with loading state */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Quick Actions */}
        <div 
          className={`absolute top-0 right-0 p-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          <button 
            className={`p-2 rounded-full shadow-md mb-2 transition-colors duration-200 ${
              isWishlisted 
                ? 'bg-primary text-white' 
                : 'bg-white hover:bg-primary hover:text-white'
            }`}
            onClick={handleAddToWishlist}
            aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            {isWishlisted ? (
              <HeartIconSolid className="w-5 h-5" />
            ) : (
              <HeartIcon className="w-5 h-5" />
            )}
          </button>
          <button 
            className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200"
            onClick={handleQuickView}
            aria-label="Quick View"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded">
              NEW
            </span>
          )}
          {isOnSale && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1 capitalize">{category}</p>
        <h3 id={`product-${id}-title`} className="font-semibold text-lg mb-2 line-clamp-2 text-gray-800">{name}</h3>
        
        {/* Rating */}
        {rating && (
          <div className="flex items-center mb-2">
            <div className="flex items-center gap-1 mr-2">
              {[...Array(5)].map((_, index) => (
                <StarIcon 
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.floor(rating) 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : index < rating 
                        ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                        : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            {reviews && <span className="text-xs text-gray-500">({reviews})</span>}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            {isOnSale ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-primary">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
          <button 
            className={`text-white px-3 py-2 rounded-full flex items-center gap-1 transition-all duration-300 ${
              isHovered 
                ? 'bg-primary-dark' 
                : 'bg-primary'
            }`}
            onClick={handleAddToCart}
            aria-label={`Add ${name} to Cart`}
          >
            <ShoppingCartIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Add</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;