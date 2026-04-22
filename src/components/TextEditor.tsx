import { useState, useEffect } from 'react';
import { Edit3, Copy, Trash2 } from 'lucide-react';

interface TextEditorProps {
  text: string;
  onTextChange: (text: string) => void;
}

function TextEditor({ text, onTextChange }: TextEditorProps) {
  const [localText, setLocalText] = useState(text);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setLocalText(text);
  }, [text]);

  useEffect(() => {
    const words = localText.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharCount(localText.length);
  }, [localText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setLocalText(newText);
    onTextChange(newText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(localText);
    alert('Text copied to clipboard!');
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the text?')) {
      setLocalText('');
      onTextChange('');
    }
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 m-0">
          <Edit3 className="w-5 h-5 sm:w-6 sm:h-6" /> Extracted Text Editor
        </h2>
        <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm">
          <span className="text-gray-600">
            <strong className="text-gray-800">{wordCount}</strong> words
          </span>
          <span className="text-gray-600">
            <strong className="text-gray-800">{charCount}</strong> characters
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4">
        <button 
          onClick={handleCopy}
          className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/30"
        >
          <Copy className="w-4 h-4 sm:w-5 sm:h-5" /> Copy Text
        </button>
        <button 
          onClick={handleClear}
          className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/30"
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" /> Clear
        </button>
      </div>

      <textarea
        className="w-full min-h-[300px] sm:min-h-[400px] p-3 sm:p-4 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base resize-y focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all scrollbar-custom font-mono"
        value={localText}
        onChange={handleTextChange}
        placeholder="Extracted text will appear here. You can edit it before exporting..."
        spellCheck={true}
      />
    </div>
  );
}

export default TextEditor;
