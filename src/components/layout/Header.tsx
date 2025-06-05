import React, { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/Button';

interface HeaderProps {
  activeTab: string;
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  activeTab,
  setSidebarOpen,
  sidebarOpen,
  className = ''
}) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const formatTabTitle = (tab: string) => {
    return tab
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setShowAccountMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowAccountMenu(false);
      }
    };

    if (showAccountMenu) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showAccountMenu]);

  return (
    <header className={`bg-white border-b border-gray-200 px-6 py-4 w-full ${className}`}>
      <div className="flex items-center justify-between w-full">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
        <Button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  variant="ghost"
  size="sm"
  className="text-gray-600 hover:text-gray-600 hover:bg-transparent p-2"
  icon="fas fa-bars"
>
</Button>

          <h1 className="text-2xl font-bold text-gray-900">
            {formatTabTitle(activeTab)}
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3">
        <div>
                <a href="#" className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors text-sm">
                  <i className="fab fa-android mr-2 text-lg"></i>
                  App for Android™
                </a>
              </div>

          <Button
            variant="primary"
            size="md"
            className="hidden md:flex items-center"
            icon="fas fa-question-circle"
          >
            ASK A QUESTION
          </Button>

          <Button
            variant="secondary"
            size="md"
            className="hidden lg:flex items-center"
            icon="fas fa-sync-alt"
          >
            REFRESH STATISTICS
          </Button>

          {/* Language Selector */}
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors">
            <div className="w-5 h-4 bg-gradient-to-b from-red-500 via-white to-black rounded-sm border border-gray-300"></div>
            <span className="text-sm font-medium text-gray-700">EN</span>
            <i className="fas fa-chevron-down text-xs text-gray-400"></i>
          </div>

          {/* User Account Menu */}
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[160px]"
            >
              <i className="fas fa-user-circle text-lg" />
              <span className="text-sm font-medium">Aff ID: 3355447</span>
              <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${showAccountMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Account Dropdown */}
            {showAccountMenu && (
              <div 
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden"
              >
                {/* User Info Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                      <i className="fas fa-user text-white text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">Affiliate Account</p>
                      <p className="text-xs text-gray-600">ID: 3355447</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="fas fa-user text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <span className="font-medium">Account</span>
                  </a>
                  
                  <div className="border-t border-gray-100 my-1" />
                  
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 transition-colors group"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="fas fa-sign-out-alt text-gray-400 group-hover:text-red-500 transition-colors" />
                    </div>
                    <span className="font-medium group-hover:text-red-600">Log out</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;