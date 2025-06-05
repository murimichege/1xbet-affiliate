import React, { useState } from 'react';
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

  const formatTabTitle = (tab: string) => {
    return tab
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <header className={`bg-white border-b border-gray-200 px-6 py-4 w-full ${className}`}>
      <div className="flex items-center justify-between w-full">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            variant="secondary"
            size="sm"
            color='green'
            icon="fas fa-bars"
          />

          <h1 className="text-2xl font-bold text-gray-900">
            {formatTabTitle(activeTab)}
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3">
        <Button
  variant="ghost"
  size="sm"
  className="hidden md:flex items-center text-green-600 hover:bg-green-100"
  icon="fab fa-android"
>
  App for Android™
</Button>


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
  <Button
    onClick={() => setShowAccountMenu(!showAccountMenu)}
    variant="primary"
    className="flex items-center gap-2 min-w-[140px]"
    icon="fas fa-user-circle"
  >
    <span className="text-sm font-medium">Aff ID: 3355447</span>
    <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${showAccountMenu ? 'rotate-180' : ''}`} />
  </Button>

  {/* Account Dropdown */}
  {showAccountMenu && (
    <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
      {/* User Info Header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <i className="fas fa-user text-blue-600 text-sm" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Affiliate</p>
            <p className="text-xs text-gray-500">ID: 3355447</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start px-4 py-2.5 text-left hover:bg-gray-50 rounded-none"
          icon="fas fa-user"
        >
          <div className="flex items-center gap-3">
            <i className="fas fa-user text-gray-400 w-4" />
            <span className="text-sm text-gray-700">My Account</span>
          </div>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start px-4 py-2.5 text-left hover:bg-gray-50 rounded-none"
          icon="fas fa-cog"
        >
          <div className="flex items-center gap-3">
            <i className="fas fa-cog text-gray-400 w-4" />
            <span className="text-sm text-gray-700">Settings</span>
          </div>
        </Button>

        <div className="border-t border-gray-100 my-1" />
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start px-4 py-2.5 text-left hover:bg-red-50 rounded-none group"
          icon="fas fa-sign-out-alt"  
        >
          <div className="flex items-center gap-3">
            <i className="fas fa-sign-out-alt text-gray-400 group-hover:text-red-500 w-4" />
            <span className="text-sm text-gray-700 group-hover:text-red-600">Log out</span>
          </div>
        </Button>
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
