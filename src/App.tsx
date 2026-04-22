import { useState } from 'react';
import { Search } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import OCRProcessor from './components/OCRProcessor';
import TextEditor from './components/TextEditor';
import ExportOptions from './components/ExportOptions';
import Footer from './components/Footer';

interface ImageFile {
  file: File;
  preview: string;
  name: string;
}

function App() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('eng');

  const handleImagesSelected = (selectedImages: ImageFile[]) => {
    setImages(selectedImages);
    setExtractedText('');
    setProgress(0);
  };

  const handleTextExtracted = (text: string) => {
    setExtractedText(text);
  };

  const handleTextChange = (newText: string) => {
    setExtractedText(newText);
  };

  const handleClear = () => {
    setImages([]);
    setExtractedText('');
    setProgress(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-500 to-purple-700">
      <header className="text-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-6 sm:pb-8 text-white">
        <h1 className="m-0 text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 drop-shadow-lg">
          <Search className="w-6 h-6 sm:w-8 sm:h-8" /> 
          <span>Advanced OCR - Image to Text</span>
        </h1>
        <p className="mt-3 mb-0 text-sm sm:text-base lg:text-xl opacity-95 font-light px-2">
          Extract text from images with AI-powered OCR technology
        </p>
      </header>

      <main className="flex-1 px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 pb-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 lg:gap-8">
          <ImageUploader 
            onImagesSelected={handleImagesSelected}
            images={images}
          />

          {images.length > 0 && (
            <OCRProcessor
              images={images}
              onTextExtracted={handleTextExtracted}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              progress={progress}
              setProgress={setProgress}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
          )}

          {extractedText && (
            <>
              <TextEditor 
                text={extractedText}
                onTextChange={handleTextChange}
              />

              <ExportOptions 
                text={extractedText}
                onClear={handleClear}
              />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
