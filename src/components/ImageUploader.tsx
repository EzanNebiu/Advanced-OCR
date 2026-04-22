import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageFile {
  file: File;
  preview: string;
  name: string;
}

interface ImageUploaderProps {
  onImagesSelected: (images: ImageFile[]) => void;
  images: ImageFile[];
}

function ImageUploader({ onImagesSelected, images }: ImageUploaderProps) {
  const [hoveredImage, setHoveredImage] = useState<ImageFile | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    onImagesSelected(imageFiles);
  }, [onImagesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp']
    },
    multiple: true
  });

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesSelected(newImages);
  };

  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`border-2 sm:border-3 border-dashed rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive 
            ? 'border-purple-500 bg-purple-50 scale-105' 
            : 'border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50/50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          {isDragActive ? (
            <p className="text-base sm:text-lg lg:text-xl text-purple-600 font-semibold">Drop the images here...</p>
          ) : (
            <>
              <p className="text-sm sm:text-base lg:text-xl text-gray-700 font-semibold px-2">Drag & drop images here, or click to select</p>
              <p className="text-xs sm:text-sm text-gray-500">Supports PNG, JPG, JPEG, GIF, BMP, TIFF, WebP</p>
            </>
          )}
        </div>
      </div>

      {images.length > 0 && (
        <div className="mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Selected Images ({images.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
                onMouseEnter={() => setHoveredImage(image)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img 
                  src={image.preview} 
                  alt={image.name}
                  className="w-full h-32 sm:h-40 lg:h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3">
                  <p className="text-white text-xs sm:text-sm font-medium truncate">{image.name}</p>
                  <button 
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 w-6 h-6 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 font-bold text-sm sm:text-base"
                    onClick={() => removeImage(index)}
                    type="button"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {hoveredImage && (
        <div className="hidden lg:block fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-2xl max-h-screen p-4 bg-white rounded-2xl shadow-2xl z-50 pointer-events-none">
          <img 
            src={hoveredImage.preview} 
            alt={hoveredImage.name}
            className="max-w-full max-h-[80vh] object-contain rounded-xl"
          />
          <p className="text-center text-gray-800 font-semibold mt-4">{hoveredImage.name}</p>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
