import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gray-800 text-gray-300 py-4 sm:py-6 px-4 sm:px-6 ${className}`}>
      <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Cookie Notice */}
        <div className="space-y-3">
          <p className="text-xs sm:text-sm leading-relaxed">
            Partners-1xBet uses cookies to enhance your website experience. By continuing to browse the Partners-1xBet website, you consent to the use of these cookies.{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300 underline transition-colors break-words">
              Find out more
            </a>
          </p>
          
          <p className="text-xs sm:text-sm">
            If you have any issues with the website, you can contact us using this{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300 underline transition-colors">
              form
            </a>
          </p>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col space-y-4 sm:space-y-6 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
          {/* Navigation Links */}
          <div className="space-y-4 lg:space-y-0">
            {/* Primary Links - Always visible */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3 text-xs sm:text-sm">
              <a href="#" className="hover:text-white transition-colors whitespace-nowrap">CONTACTS</a>
              <a href="#" className="hover:text-white transition-colors whitespace-nowrap">NEWS</a>
              <a href="#" className="hover:text-white transition-colors whitespace-nowrap">PRIVACY POLICY</a>
              <a href="#" className="hover:text-white transition-colors whitespace-nowrap">COOKIE POLICY</a>
            </div>
            
            {/* Android App Link - Responsive positioning */}
            <div className="lg:hidden">
              <a href="#" className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors text-xs sm:text-sm">
                <i className="fab fa-android mr-1 sm:mr-2 text-sm sm:text-base"></i> 
                App for Android™
              </a>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4 lg:flex-col lg:space-x-0 lg:space-y-4 xl:flex-row xl:space-y-0 xl:space-x-4">
            {/* Android App Link - Desktop */}
            <div className="hidden lg:block xl:order-1">
              <a href="#" className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors text-sm">
                <i className="fab fa-android mr-2 text-base"></i> 
                App for Android™
              </a>
            </div>

            {/* Award Section */}
            <div className="flex items-center justify-center sm:justify-end lg:justify-center xl:justify-end space-x-3 sm:space-x-4 xl:order-2">
              <div className="text-right flex-shrink-0">
                <div className="text-yellow-400 font-bold text-xs sm:text-sm">WINNER</div>
                <div className="text-xs leading-tight">Best Affiliate Product Innovation</div>
              </div>
              <div className="w-12 h-9 sm:w-16 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                <div className="text-black font-bold text-center">
                  <div className="text-xs sm:text-xs leading-tight">SBC</div>
                  <div className="text-[8px] sm:text-[8px] leading-tight">AWARDS 2019</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - Always at bottom */}
        <div className="pt-3 sm:pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-400 text-center sm:text-left">
            Copyright © 2007–2025 "Partners-1xBet". All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;