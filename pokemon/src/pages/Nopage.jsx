import { useState, useEffect } from "react";

const NoPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGoBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      window.history.back();
    }, 300);
  };

  const handleGoHome = () => {
    setIsAnimating(true);
    setTimeout(() => {
      window.location.href = '/';
    }, 300);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div 
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${20 + mousePosition.x * 0.02}%`,
            top: `${10 + mousePosition.y * 0.02}%`,
            transform: `translate(-50%, -50%)`,
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            right: `${15 + mousePosition.x * 0.015}%`,
            bottom: `${20 + mousePosition.y * 0.015}%`,
            transform: `translate(50%, 50%)`,
            animationDelay: '1s',
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${60 + mousePosition.x * 0.01}%`,
            top: `${70 + mousePosition.y * 0.01}%`,
            transform: `translate(-50%, -50%)`,
            animationDelay: '2s',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* 404 Number */}
        <div className="mb-8 relative">
          <h1 
            className={`text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 select-none transition-all duration-500 ${
              isAnimating ? 'scale-110 rotate-12' : 'hover:scale-105'
            }`}
            style={{
              textShadow: '0 0 30px rgba(147, 51, 234, 0.5)',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
            }}
          >
            404
          </h1>
          
          {/* Glitch Effect Overlay */}
          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-red-500 opacity-0 hover:opacity-20 transition-opacity duration-200 select-none animate-pulse"
               style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}>
            404
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed animate-fade-in">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry, even the best explorers sometimes take a wrong turn in cyberspace.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={handleGoHome}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 hover:rotate-1"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={handleGoBack}
            className="group relative px-8 py-4 bg-transparent border-2 border-purple-400 text-purple-400 font-semibold rounded-xl hover:bg-purple-400 hover:text-white transform hover:scale-105 transition-all duration-300 hover:-rotate-1"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </span>
          </button>
        </div>

        {/* Fun Interactive Element */}
        <div className="mb-8">
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-full animate-spin-slow group-hover:animate-pulse" />
            <div className="absolute inset-4 bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-2xl animate-bounce">🚀</span>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Click me!
            </div>
          </div>
        </div>

        {/* Additional Help */}
        <div className="text-center text-gray-400 max-w-md">
          <p className="text-sm mb-4">
            If you believe this is an error, please contact our support team or try refreshing the page.
          </p>
          <div className="flex justify-center space-x-6">
            <button className="text-gray-500 hover:text-purple-400 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </button>
            <button className="text-gray-500 hover:text-purple-400 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </button>
            <button className="text-gray-500 hover:text-purple-400 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.995 1.488-1.995.702 0 1.04.219 1.04 1.179 0 .719-.219 1.796-.332 2.792-.188 1.070.537 1.943 1.592 1.943 1.910 0 3.381-2.016 3.381-4.928 0-2.578-1.850-4.38-4.492-4.38-3.062 0-4.861 2.297-4.861 4.674 0 .926.357 1.925.803 2.466a.307.307 0 01.078.297c-.084.357-.273 1.117-.309 1.273-.047.219-.154.265-.357.159-1.332-.619-2.165-2.574-2.165-4.141C3.39 5.570 6.181 2.9 9.966 2.9c2.766 0 4.926 1.968 4.926 4.598 0 2.744-1.731 4.95-4.133 4.95-.807 0-1.566-.42-1.825-.92 0 0-.4 1.523-.497 1.901-.18.693-.666 1.560-.993 2.091.749.232 1.544.357 2.372.357 6.624 0 11.99-5.367 11.99-11.989C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NoPage;
