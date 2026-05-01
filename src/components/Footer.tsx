import { Mail, Heart } from 'lucide-react';

// Custom SVG icons since lucide-react doesn't export these in this version
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="flex flex-col text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            OCR Image to Text
          </h3>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            Extract text from images with AI-powered OCR technology
          </p>
        </div>

        <div className="flex flex-col text-center sm:text-left">
          <h4 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">
            About
          </h4>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
            All processing is done locally in your browser. Your images never leave your device.
          </p>
        </div>

        <div className="flex flex-col text-center sm:text-left sm:col-span-2 lg:col-span-1">
          <h4 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">
            Connect
          </h4>
          <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
            <a
              href="mailto:ezannebiu8@gmail.com"
              className="text-white/60 transition-all duration-300 p-2 rounded-lg flex items-center justify-center hover:text-green-500 hover:bg-green-500/10 hover:-translate-y-0.5"
              aria-label="Email"
              title="Email"
            >
              <Mail size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ezan-nebiu-2b0966311"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition-all duration-300 p-2 rounded-lg flex items-center justify-center hover:text-green-500 hover:bg-green-500/10 hover:-translate-y-0.5"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="https://github.com/EzanNebiu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition-all duration-300 p-2 rounded-lg flex items-center justify-center hover:text-green-500 hover:bg-green-500/10 hover:-translate-y-0.5"
              aria-label="GitHub"
              title="GitHub"
            >
              <GithubIcon size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-center">
        <p className="text-xs sm:text-sm text-white/50 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span>© {currentYear} OCR App. Made with by Ezan M. Nebija</span>
          <span className="hidden sm:inline">•</span>
          <span>Powered by Tesseract.js</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
