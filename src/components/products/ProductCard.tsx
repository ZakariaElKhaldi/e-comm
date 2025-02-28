interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isOnSale?: boolean;
  discount?: number;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  isNew = false,
  isOnSale = false,
  discount = 0,
}: ProductCardProps) => {
  const discountedPrice = isOnSale ? price - (price * discount) / 100 : price;

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Quick Actions */}
        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white mb-2">
            <span className="sr-only">Add to Wishlist</span>
            ❤️
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white">
            <span className="sr-only">Quick View</span>
            👁️
          </button>
        </div>

        {/* Tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded">
              NEW
            </span>
          )}
          {isOnSale && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{category}</p>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>
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
          <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 