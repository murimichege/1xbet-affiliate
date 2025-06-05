import React from 'react';

interface FooterProps {
  darkMode?: boolean;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ darkMode = false, className = '' }) => {
  return (
    <footer className={`${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-800 text-gray-300'} py-6 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Cookie Notice */}
        <div className="mb-4">
          <p className="text-sm leading-relaxed">
            Partners-1xBet uses cookies to enhance your website experience. By continuing to browse the Partners-1xBet website, you consent to the use of these cookies.{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300 underline transition-colors">
              Find out more
            </a>
          </p>
        </div>

        {/* Contact Info */}
        <div className="mb-6">
          <p className="text-sm">
            If you have any issues with the website, you can contact us using this{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300 underline transition-colors">
              form
            </a>
          </p>
        </div>

        {/* Footer Links and Awards */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Left Side - Links */}
          <div className="flex flex-wrap items-center space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              CONTACTS
            </a>
            <a href="#" className="hover:text-white transition-colors">
              NEWS
            </a>
            <a href="#" className="hover:text-white transition-colors">
              PRIVACY POLICY
            </a>
            <a href="#" className="hover:text-white transition-colors">
              COOKIE POLICY
            </a>
            
            {/* Android App Link */}
            <a href="#" className="flex items-center text-green-400 hover:text-green-300 transition-colors">
              <i className="fab fa-android mr-1"></i>
              App for Android™
            </a>
          </div>

          {/* Right Side - Award */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-yellow-400 font-bold text-sm">WINNER</div>
              <div className="text-xs">Best Affiliate Product Innovation</div>
            </div>
            
            {/* Award Logo */}
            <div className="w-16 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
              <div className="text-black font-bold text-xs text-center">
                <div>SBC</div>
                <div className="text-[8px]">AWARDS 2019</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            Copyright © 2007-2025 "Partners-1xBet". All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;