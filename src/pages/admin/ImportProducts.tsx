import { useState } from 'react';
import { ArrowUpTrayIcon, DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ImportProducts = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setErrors([]);
    } else {
      setErrors(['Please select a valid CSV file']);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    // TODO: Implement actual file upload and processing
    setTimeout(() => {
      clearInterval(interval);
      setIsUploading(false);
      setUploadProgress(100);
      // Reset after 2 seconds
      setTimeout(() => {
        setFile(null);
        setUploadProgress(0);
      }, 2000);
    }, 5000);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Import Products</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Upload CSV File</h2>
            
            {/* File Drop Zone */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <ArrowUpTrayIcon className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-1">
                  Drop your CSV file here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Maximum file size: 10MB
                </p>
              </label>
            </div>

            {/* Selected File */}
            {file && (
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DocumentTextIcon className="w-8 h-8 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
                {isUploading && (
                  <div className="mt-3">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Error Messages */}
            {errors.length > 0 && (
              <div className="mt-4 bg-red-50 text-red-700 p-4 rounded-lg">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            {/* Upload Button */}
            <div className="mt-6">
              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className={`w-full px-4 py-2 rounded-lg ${
                  !file || isUploading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary-dark'
                }`}
              >
                {isUploading ? 'Uploading...' : 'Upload and Process'}
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Instructions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">File Format</h3>
                <p className="text-sm text-gray-600">
                  Your CSV file should include the following columns:
                </p>
                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                  <li>name (required)</li>
                  <li>category (required)</li>
                  <li>price (required)</li>
                  <li>stock (required)</li>
                  <li>description</li>
                  <li>image_url</li>
                  <li>sku</li>
                  <li>status</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Guidelines</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Maximum 1000 products per import</li>
                  <li>• Images should be valid URLs</li>
                  <li>• Price should be in decimal format (e.g., 99.99)</li>
                  <li>• Status should be either 'active' or 'inactive'</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600">
                  Download our sample CSV template to get started.
                </p>
                <button className="mt-2 text-primary hover:text-primary-dark text-sm font-medium">
                  Download Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportProducts; 