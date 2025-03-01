import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  XMarkIcon,
  PhotoIcon,
  EyeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import RichTextEditor from '../../components/admin/RichTextEditor';
import VariantManager from '../../components/admin/VariantManager';
import ImageOptimizer from '../../components/admin/ImageOptimizer';
import ProductPreview from '../../components/admin/ProductPreview';

export interface Variant {
  id: string;
  size: string;
  color: string;
  price: number;
  compareAtPrice: number;
  stock: number;
  sku: string;
}

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: number;
  compareAtPrice: number;
  sku: string;
  barcode: string;
  weight: number;
  quantity: number;
  sizes: string[];
  colors: string[];
  status: 'draft' | 'active';
  images: File[];
  features: string[];
  specifications: Array<{ key: string; value: string }>;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  variants: Variant[];
}

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  category: '',
  price: 0,
  compareAtPrice: 0,
  sku: '',
  barcode: '',
  weight: 0,
  quantity: 0,
  sizes: [],
  colors: [],
  status: 'draft',
  images: [],
  features: [''],
  specifications: [{ key: '', value: '' }],
  seoTitle: '',
  seoDescription: '',
  tags: [],
  variants: [],
};

const categories = [
  'Helmets',
  'Jackets',
  'Gloves',
  'Boots',
  'Pants',
  'Accessories',
];

const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const availableColors = ['Black', 'White', 'Red', 'Blue', 'Gray', 'Brown'];

const tabs = [
  { id: 'basic', name: 'Basic Info' },
  { id: 'media', name: 'Media' },
  { id: 'variants', name: 'Variants' },
  { id: 'features', name: 'Features & Specs' },
  { id: 'seo', name: 'SEO & Organization' },
];

const steps = [
  { id: 1, name: 'Basic Information', tab: 'basic' },
  { id: 2, name: 'Add Media', tab: 'media' },
  { id: 3, name: 'Configure Variants', tab: 'variants' },
  { id: 4, name: 'Additional Details', tab: 'features' },
  { id: 5, name: 'SEO & Review', tab: 'seo' },
];

const CreateEditProduct = () => {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [selectedImageForOptimization, setSelectedImageForOptimization] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Autosave functionality
  useEffect(() => {
    if (isDirty) {
      const timer = setTimeout(() => {
        handleAutosave();
      }, 30000); // Autosave after 30 seconds of inactivity

      return () => clearTimeout(timer);
    }
  }, [formData, isDirty]);

  const handleAutosave = async () => {
    try {
      setIsSaving(true);
      // TODO: Implement actual save logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setLastSaved(new Date());
      setIsDirty(false);
    } catch (error) {
      console.error('Autosave failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (formData.variants.length === 0 && formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...acceptedFiles],
    }));

    // Create preview URLs for the new images
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true
  });

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    URL.revokeObjectURL(previewImages[index]);
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSizeToggle = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleColorToggle = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color],
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ''],
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => (i === index ? value : feature)),
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }],
    }));
  };

  const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) =>
        i === index ? { ...spec, [field]: value } : spec
      ),
    }));
  };

  const removeSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData(prev => ({ ...prev, description: value }));
  };

  const handleOptimizedImage = (optimizedImage: File) => {
    if (selectedImageForOptimization) {
      const index = formData.images.indexOf(selectedImageForOptimization);
      if (index !== -1) {
        const newImages = [...formData.images];
        newImages[index] = optimizedImage;
        setFormData(prev => ({ ...prev, images: newImages }));
        
        // Update preview
        URL.revokeObjectURL(previewImages[index]);
        const newPreviews = [...previewImages];
        newPreviews[index] = URL.createObjectURL(optimizedImage);
        setPreviewImages(newPreviews);
      }
    }
    setSelectedImageForOptimization(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Show error message and switch to the tab with the first error
      const firstErrorField = Object.keys(errors)[0];
      const tabWithError = tabs.find(tab => 
        document.querySelector(`[data-tab="${tab.id}"] [name="${firstErrorField}"]`)
      )?.id;
      
      if (tabWithError) {
        setActiveTab(tabWithError);
      }
      return;
    }

    try {
      setIsSaving(true);
      // TODO: Implement actual save logic
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setLastSaved(new Date());
      setIsDirty(false);
      // Show success message or redirect
    } catch (error) {
      console.error('Save failed:', error);
      // Show error message
    } finally {
      setIsSaving(false);
    }
  };

  const handleNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep <= steps.length) {
      setCurrentStep(nextStep);
      setActiveTab(steps[nextStep - 1].tab);
    }
  };

  const handlePrevStep = () => {
    const prevStep = currentStep - 1;
    if (prevStep > 0) {
      setCurrentStep(prevStep);
      setActiveTab(steps[prevStep - 1].tab);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create New Product</h1>
          <div className="mt-1 text-sm text-gray-500 flex items-center gap-2">
            {isSaving && (
              <span className="flex items-center">
                <ArrowPathIcon className="w-4 h-4 animate-spin mr-1" />
                Saving...
              </span>
            )}
            {lastSaved && (
              <span className="flex items-center">
                <CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" />
                Last saved {lastSaved.toLocaleTimeString()}
              </span>
            )}
            {isDirty && (
              <span className="flex items-center">
                <ExclamationCircleIcon className="w-4 h-4 text-yellow-500 mr-1" />
                Unsaved changes
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            <EyeIcon className="w-5 h-5 mr-2" />
            {showPreview ? 'Edit Mode' : 'Preview'}
          </button>
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className={`px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center ${
              isSaving ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isSaving && <ArrowPathIcon className="w-5 h-5 animate-spin mr-2" />}
            {isSaving ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step.id <= currentStep
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 text-gray-500'
                }`}
              >
                {step.id}
              </div>
              <div
                className={`ml-2 text-sm ${
                  step.id <= currentStep ? 'text-primary' : 'text-gray-500'
                }`}
              >
                {step.name}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    step.id < currentStep ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex gap-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 -mb-px text-sm font-medium ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info Tab */}
        <div className={activeTab === 'basic' ? '' : 'hidden'} data-tab="basic">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <RichTextEditor
              value={formData.description}
              onChange={handleDescriptionChange}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Media Tab */}
        <div className={activeTab === 'media' ? '' : 'hidden'} data-tab="media">
          <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary">
            <input {...getInputProps()} />
            <PhotoIcon className="w-12 h-12 mx-auto text-gray-400" />
            <p className="mt-2 text-gray-600">
              {isDragActive ? 'Drop images here' : 'Drag & drop images here, or click to select files'}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={previewImages[index]}
                  alt={`Product ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setSelectedImageForOptimization(image)}
                    className="p-1.5 bg-white rounded-full text-gray-600 hover:text-primary"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-1.5 bg-white rounded-full text-gray-600 hover:text-red-500"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedImageForOptimization && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Optimize Image</h3>
              <ImageOptimizer
                image={selectedImageForOptimization}
                onOptimized={handleOptimizedImage}
              />
            </div>
          )}
        </div>

        {/* Variants Tab */}
        <div className={activeTab === 'variants' ? '' : 'hidden'} data-tab="variants">
          <VariantManager
            selectedSizes={formData.sizes}
            selectedColors={formData.colors}
            variants={formData.variants}
            onChange={(variants) => {
              setFormData(prev => ({ ...prev, variants }));
              setIsDirty(true);
            }}
          />
        </div>

        {/* Features & Specs Tab */}
        <div className={activeTab === 'features' ? '' : 'hidden'} data-tab="features">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Features</h2>
            <button
              type="button"
              onClick={addFeature}
              className="text-primary hover:text-primary-dark"
            >
              Add Feature
            </button>
          </div>
          
          <div className="space-y-3">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Enter feature"
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Tab */}
        <div className={activeTab === 'seo' ? '' : 'hidden'} data-tab="seo">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO Title
              </label>
              <input
                type="text"
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter SEO title"
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.seoTitle.length}/60 characters recommended
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO Description
              </label>
              <textarea
                name="seoDescription"
                value={formData.seoDescription}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter SEO description"
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.seoDescription.length}/160 characters recommended
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="flex-1 min-w-[120px] outline-none"
                  placeholder="Add tags..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handlePrevStep}
            className={`px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 ${
              currentStep === 1 ? 'invisible' : ''
            }`}
          >
            Previous Step
          </button>
          <button
            type="button"
            onClick={currentStep === steps.length ? handleSubmit : handleNextStep}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            {currentStep === steps.length ? 'Save Product' : 'Next Step'}
          </button>
        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Product Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <ProductPreview
              name={formData.name}
              description={formData.description}
              images={previewImages}
              price={formData.price}
              compareAtPrice={formData.compareAtPrice}
              variants={formData.variants}
              features={formData.features}
              specifications={formData.specifications}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEditProduct; 