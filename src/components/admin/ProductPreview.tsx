import { useState } from 'react';
import { Variant } from '../../pages/admin/CreateEditProduct';

interface ProductPreviewProps {
  name: string;
  description: string;
  images: string[];
  price: number;
  compareAtPrice: number;
  variants: Variant[];
  features: string[];
  specifications: Array<{ key: string; value: string }>;
}

const ProductPreview = ({
  name,
  description,
  images,
  price,
  compareAtPrice,
  variants,
  features,
  specifications,
}: ProductPreviewProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const uniqueSizes = [...new Set(variants.map(v => v.size))];
  const uniqueColors = [...new Set(variants.map(v => v.color))];

  const selectedVariant = variants.find(
    v => v.size === selectedSize && v.color === selectedColor
  );

  return (
    <div className="bg-white">
      <div className="grid grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={images[selectedImage]}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`${name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          
          <div className="mt-4">
            <div className="flex items-center">
              <p className="text-2xl font-semibold text-gray-900">
                ${selectedVariant?.price || price}
              </p>
              {(selectedVariant?.compareAtPrice || compareAtPrice) > 0 && (
                <p className="ml-3 text-lg text-gray-500 line-through">
                  ${selectedVariant?.compareAtPrice || compareAtPrice}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <div dangerouslySetInnerHTML={{ __html: description }} className="prose" />
          </div>

          {/* Variants */}
          {uniqueSizes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="mt-2 flex gap-2">
                {uniqueSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 text-gray-700 hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {uniqueColors.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <div className="mt-2 flex gap-2">
                {uniqueColors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedColor === color
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 text-gray-700 hover:border-primary'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            type="button"
            className="mt-8 w-full bg-primary text-white py-3 px-8 rounded-lg hover:bg-primary-dark"
          >
            Add to Cart
          </button>

          {/* Features */}
          {features.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Features</h3>
              <ul className="mt-4 space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="h-1.5 w-1.5 mt-2 rounded-full bg-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {specifications.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Specifications</h3>
              <dl className="mt-4 space-y-3">
                {specifications.map((spec, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    <dt className="text-gray-600">{spec.key}</dt>
                    <dd className="col-span-2 text-gray-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPreview; 