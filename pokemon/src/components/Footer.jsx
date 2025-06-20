const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-900 border-t border-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
           
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-3">Pokepedia</h3>
              <p className="text-indigo-200 text-sm leading-relaxed">
                Your ultimate destination for Pokémon information, stats, and discoveries.
              </p>
            </div>

           
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
              <div className="space-y-2">
                <a href="/" className="block text-indigo-200 hover:text-white transition-colors duration-200">
                  Home
                </a>
                <a href="/" className="block text-indigo-200 hover:text-white transition-colors duration-200">
                  Library
                </a>
                <a href="/" className="block text-indigo-200 hover:text-white transition-colors duration-200">
                  About
                </a>
              </div>
            </div>

            
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold text-white mb-3">Connect</h4>
              <div className="flex justify-center md:justify-end space-x-4">
                <a 
                  href="/" 
                  className="text-indigo-200 hover:text-white transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="/" 
                  className="text-indigo-200 hover:text-white transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          
          <div className="border-t border-indigo-600 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-indigo-200 text-sm">
                &copy; 2025 Pokepedia. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="/" className="text-indigo-200 hover:text-white text-sm transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="/" className="text-indigo-200 hover:text-white text-sm transition-colors duration-200">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
