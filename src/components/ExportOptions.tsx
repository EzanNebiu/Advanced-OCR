import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { Save, FileText, FileType, File, RotateCcw } from 'lucide-react';

interface ExportOptionsProps {
  text: string;
  onClear: () => void;
}

function ExportOptions({ text, onClear }: ExportOptionsProps) {
  const exportAsTxt = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `ocr-text-${Date.now()}.txt`);
  };

  const exportAsPdf = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    const lineHeight = 7;
    
    doc.setFontSize(12);
    
    const lines = doc.splitTextToSize(text, maxWidth) as string[];
    let y = margin;
    
    lines.forEach((line: string) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });
    
    doc.save(`ocr-text-${Date.now()}.pdf`);
  };

  const exportAsDocx = async () => {
    const paragraphs = text.split('\n').map(line => 
      new Paragraph({
        children: [
          new TextRun({
            text: line || ' ',
            font: 'Calibri',
            size: 24,
          }),
        ],
        spacing: {
          after: 200,
        },
      })
    );

    const doc = new Document({
      sections: [{
        properties: {},
        children: paragraphs,
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `ocr-text-${Date.now()}.docx`);
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="m-0 mb-2 text-gray-800 text-2xl sm:text-3xl flex items-center justify-center gap-2 flex-wrap">
          <Save className="w-5 h-5 sm:w-6 sm:h-6" /> Export Options
        </h2>
        <p className="m-0 text-gray-600 text-sm sm:text-base px-2">
          Download the extracted text in your preferred format
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <button 
          onClick={exportAsTxt}
          className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border-none cursor-pointer transition-all duration-300 shadow-lg text-left bg-gradient-to-br from-purple-500 to-purple-700 hover:-translate-y-1 hover:shadow-2xl"
        >
          <span className="flex-shrink-0 flex items-center justify-center">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="font-bold text-base sm:text-lg text-white">Text File</span>
            <span className="text-xs sm:text-sm opacity-90 text-white">.txt format</span>
          </div>
        </button>

        <button 
          onClick={exportAsPdf}
          className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border-none cursor-pointer transition-all duration-300 shadow-lg text-left bg-gradient-to-br from-pink-400 to-red-500 hover:-translate-y-1 hover:shadow-2xl"
        >
          <span className="flex-shrink-0 flex items-center justify-center">
            <File className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="font-bold text-base sm:text-lg text-white">PDF Document</span>
            <span className="text-xs sm:text-sm opacity-90 text-white">.pdf format</span>
          </div>
        </button>

        <button 
          onClick={exportAsDocx}
          className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border-none cursor-pointer transition-all duration-300 shadow-lg text-left bg-gradient-to-br from-blue-400 to-cyan-400 hover:-translate-y-1 hover:shadow-2xl sm:col-span-2 lg:col-span-1"
        >
          <span className="flex-shrink-0 flex items-center justify-center">
            <FileType className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="font-bold text-base sm:text-lg text-white">Word Document</span>
            <span className="text-xs sm:text-sm opacity-90 text-white">.docx format</span>
          </div>
        </button>
      </div>

      <div className="flex justify-center pt-4 sm:pt-6 border-t-2 border-gray-100">
        <button 
          onClick={onClear}
          className="w-full sm:w-auto bg-gradient-to-br from-red-500 to-red-600 px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-lg shadow-red-500/30 border-none rounded-lg sm:rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-red-500/40"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" /> Start Over
        </button>
      </div>
    </div>
  );
}

export default ExportOptions;
