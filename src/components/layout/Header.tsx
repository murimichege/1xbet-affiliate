import React, { useState } from 'react';

interface HeaderProps {
  activeTab: string;
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
  darkMode?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  activeTab,
  setSidebarOpen,
  sidebarOpen,
  darkMode = false,
  className = ''
}) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  
  const formatTabTitle = (tab: string) => {
    return tab.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <header className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4 w-full ${className}`}>
      <div className="flex items-center justify-between w-full">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            <i className="fas fa-bars"></i>
          </button>
          
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {formatTabTitle(activeTab)}
          </h1>
        </div>
        
        {/* Right Side */}
        <div className="flex items-center space-x-3">
          {/* Mobile App Link */}
          <button className="hidden md:flex items-center px-3 py-1.5 text-sm font-medium rounded-lg text-green-600 hover:bg-green-50 transition-colors">
            <i className="fab fa-android mr-2"></i>
            App for Android™
          </button>
          
          {/* Action Buttons */}
          <button className="hidden md:flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
            <i className="fas fa-question-circle mr-2"></i>
            ASK A QUESTION
          </button>
          
          <button className="hidden lg:flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors">
            <i className="fas fa-sync-alt mr-2"></i>
            REFRESH STATISTICS
          </button>

          {/* Notification Badge */}
          <div className="relative">
            <div className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
              2
            </div>
          </div>
          
          {/* Language Selector */}
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded transition-colors">
            <div className="w-5 h-4 bg-gradient-to-b from-red-500 via-white to-black rounded-sm border border-gray-300"></div>
            <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
              EN
            </span>
            <i className="fas fa-chevron-down text-xs text-gray-400"></i>
          </div>
         
          {/* User Account Menu */}
          <div className="relative">
            <button
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <i className="fas fa-user-circle text-gray-400 text-lg mr-2"></i>
              <span className={`${darkMode ? 'text-white' : 'text-gray-700'}`}>
                Aff ID: 3355447
              </span>
            </button>

            {/* Account Dropdown */}
            {showAccountMenu && (
              <div className={`absolute right-0 mt-2 w-48 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border rounded-lg shadow-lg z-50`}>
                <div className="py-2">
                  <button className={`w-full px-4 py-2 text-left text-sm ${
                    darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                  } flex items-center transition-colors`}>
                    <i className="fas fa-user mr-3"></i>
                    Account
                  </button>
                  <button className={`w-full px-4 py-2 text-left text-sm ${
                    darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                  } flex items-center transition-colors`}>
                    <i className="fas fa-sign-out-alt mr-3"></i>
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header