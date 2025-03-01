import { useState, useRef } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageOptimizerProps {
  image: File | null;
  onOptimized: (optimizedImage: File) => void;
}

const ImageOptimizer = ({ image, onOptimized }: ImageOptimizerProps) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    imgRef.current = e.currentTarget;
  };

  const generateCrop = async () => {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    canvas.toBlob((blob) => {
      if (!blob) return;
      const optimizedFile = new File([blob], 'optimized.jpg', { type: 'image/jpeg' });
      setPreview(URL.createObjectURL(optimizedFile));
      onOptimized(optimizedFile);
    }, 'image/jpeg', 0.9);
  };

  if (!image) return null;

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4">
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        >
          <img
            ref={imgRef}
            src={URL.createObjectURL(image)}
            onLoad={onImageLoad}
            className="max-w-full h-auto"
            alt="Original"
          />
        </ReactCrop>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={generateCrop}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Apply Crop
        </button>
        
        {preview && (
          <div className="border rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
            <img src={preview} alt="Preview" className="max-w-xs h-auto" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageOptimizer; 