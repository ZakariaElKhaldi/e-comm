interface Variant {
  id: string;
  size: string;
  color: string;
  price: number;
  compareAtPrice: number;
  stock: number;
  sku: string;
}

interface VariantManagerProps {
  selectedSizes: string[];
  selectedColors: string[];
  variants: Variant[];
  onChange: (variants: Variant[]) => void;
}

const VariantManager = ({
  selectedSizes,
  selectedColors,
  variants,
  onChange,
}: VariantManagerProps) => {
  const generateVariants = () => {
    const newVariants: Variant[] = [];
    selectedSizes.forEach(size => {
      selectedColors.forEach(color => {
        const existingVariant = variants.find(
          v => v.size === size && v.color === color
        );
        if (existingVariant) {
          newVariants.push(existingVariant);
        } else {
          newVariants.push({
            id: `${size}-${color}`.toLowerCase(),
            size,
            color,
            price: 0,
            compareAtPrice: 0,
            stock: 0,
            sku: '',
          });
        }
      });
    });
    onChange(newVariants);
  };

  const updateVariant = (index: number, field: keyof Variant, value: string | number) => {
    const newVariants = [...variants];
    newVariants[index] = {
      ...newVariants[index],
      [field]: value,
    };
    onChange(newVariants);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Product Variants</h3>
        <button
          type="button"
          onClick={generateVariants}
          className="text-primary hover:text-primary-dark"
        >
          Generate Variants
        </button>
      </div>

      {variants.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Color</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Compare At</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {variants.map((variant, index) => (
                <tr key={variant.id}>
                  <td className="px-4 py-3">{variant.size}</td>
                  <td className="px-4 py-3">{variant.color}</td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={variant.price}
                        onChange={(e) => updateVariant(index, 'price', parseFloat(e.target.value))}
                        className="pl-7 pr-4 py-1 border rounded w-24"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={variant.compareAtPrice}
                        onChange={(e) => updateVariant(index, 'compareAtPrice', parseFloat(e.target.value))}
                        className="pl-7 pr-4 py-1 border rounded w-24"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => updateVariant(index, 'stock', parseInt(e.target.value))}
                      className="px-4 py-1 border rounded w-20"
                      min="0"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                      className="px-4 py-1 border rounded w-32"
                      placeholder="SKU"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Select sizes and colors, then click "Generate Variants"
        </div>
      )}
    </div>
  );
};

export default VariantManager; 