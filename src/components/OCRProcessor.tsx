import { useState, Dispatch, SetStateAction } from 'react';
import { createWorker } from 'tesseract.js';
import { Bot, Rocket, Hourglass } from 'lucide-react';

interface ImageFile {
  file: File;
  preview: string;
  name: string;
}

interface OCRProcessorProps {
  images: ImageFile[];
  onTextExtracted: (text: string) => void;
  isProcessing: boolean;
  setIsProcessing: Dispatch<SetStateAction<boolean>>;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  selectedLanguage: string;
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
}

function OCRProcessor({ 
  images, 
  onTextExtracted, 
  isProcessing, 
  setIsProcessing, 
  progress, 
  setProgress,
  selectedLanguage,
  setSelectedLanguage 
}: OCRProcessorProps) {
  const [currentImage, setCurrentImage] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const languages = [
    { code: 'eng', name: 'English' },
    { code: 'deu', name: 'German' },
    { code: 'sqi', name: 'Albanian' },
    { code: 'spa', name: 'Spanish' },
  ];

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const processImages = async () => {
    setIsProcessing(true);
    setProgress(0);
    setLogs([]);
    
    let combinedText = '';

    try {
      addLog('Initializing OCR engine...');
      const worker = await createWorker(selectedLanguage, 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            const progressPercent = Math.round(m.progress * 100);
            setProgress(progressPercent);
          }
        },
      });

      addLog(`Processing ${images.length} image(s) with ${languages.find(l => l.code === selectedLanguage)?.name} language`);

      for (let i = 0; i < images.length; i++) {
        setCurrentImage(images[i].name);
        addLog(`Processing image ${i + 1}/${images.length}: ${images[i].name}`);

        const { data: { text } } = await worker.recognize(images[i].file);
        
        if (text.trim()) {
          combinedText += `\n--- ${images[i].name} ---\n${text}\n`;
          addLog(`✓ Extracted ${text.length} characters from ${images[i].name}`);
        } else {
          addLog(`⚠ No text found in ${images[i].name}`);
        }
      }

      await worker.terminate();
      
      if (combinedText.trim()) {
        onTextExtracted(combinedText.trim());
        addLog('✓ OCR processing completed successfully!');
      } else {
        addLog('⚠ No text was extracted from any images');
        alert('No text was detected in the images. Please try:\n- Higher quality images\n- Better lighting\n- Clearer text\n- Different language setting');
      }
      
    } catch (error) {
      console.error('OCR Error:', error);
      addLog(`✗ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      alert('An error occurred during OCR processing. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setCurrentImage('');
    }
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 m-0">
          <Bot className="w-5 h-5 sm:w-6 sm:h-6" /> OCR Processing
        </h2>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <label htmlFor="language" className="font-semibold text-gray-700 text-sm sm:text-base">Language:</label>
          <select 
            id="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            disabled={isProcessing}
            className="px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-gray-300 rounded-lg bg-white font-medium text-gray-700 text-sm sm:text-base focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center mb-4 sm:mb-6">
        <button 
          onClick={processImages}
          disabled={isProcessing || images.length === 0}
          className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-lg sm:rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {isProcessing ? (
            <><Hourglass className="animate-spin w-4 h-4 sm:w-5 sm:h-5" /> Processing...</>
          ) : (
            <><Rocket className="w-4 h-4 sm:w-5 sm:h-5" /> Start OCR Processing</>
          )}
        </button>
      </div>

      {isProcessing && (
        <div className="mb-4 sm:mb-6">
          <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-xs sm:text-sm text-gray-600 mt-2 font-medium truncate px-2">
            {progress}% - {currentImage}
          </p>
        </div>
      )}

      {logs.length > 0 && (
        <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 border-gray-200">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3">Processing Log</h3>
          <div className="max-h-48 sm:max-h-60 overflow-y-auto scrollbar-custom space-y-1">
            {logs.map((log, index) => (
              <div 
                key={index} 
                className="text-xs sm:text-sm font-mono text-gray-700 px-2 sm:px-3 py-1.5 sm:py-2 bg-white rounded border border-gray-200 break-words"
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OCRProcessor;
