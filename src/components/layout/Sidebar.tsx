import React from 'react';
import { NavigationItem } from '@/types/common';
import { Button, Icon } from '../ui';

interface SidebarProps {
  navigationItems: NavigationItem[];
  marketingItems: NavigationItem[];
  reportItems: NavigationItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  darkMode?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  navigationItems,
  marketingItems,
  reportItems,
  activeTab,
  onTabChange,
  sidebarOpen,
  setSidebarOpen,
  darkMode = false
}) => {
  const NavSection: React.FC<{
    title: string;
    items: NavigationItem[];
  }> = ({ title, items }) => (
    <div className="mb-8">
      {sidebarOpen && (
        <h3 className={`px-3 text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider mb-3`}>
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onTabChange(item.id);
              // Close sidebar on mobile after selection
              if (window.innerWidth < 1024) {
                setSidebarOpen(false);
              }
            }}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700 shadow-sm'
                : `${darkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`
            }`}
            title={!sidebarOpen ? item.label : undefined}
          >
            <Icon 
              name={item.icon} 
              className={`w-5 h-5 ${sidebarOpen ? 'mr-3' : 'mx-auto'} transition-colors ${
                activeTab === item.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
              }`} 
            />
            {sidebarOpen && (
              <>
                <span className="truncate">{item.label}</span>
                {/* Active indicator */}
                {activeTab === item.id && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Sidebar */}
      <div 
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-50 ${sidebarOpen ? 'w-64' : 'w-0 lg:w-16'} ${
          darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        } border-r transform transition-all duration-300 ease-in-out flex flex-col overflow-hidden
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Header */}
        <div className={`flex items-center h-16 px-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex-shrink-0 ${
          sidebarOpen ? 'justify-between' : 'justify-center'
        }`}>
          {sidebarOpen ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">1X</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-blue-600">BET</span>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} -mt-1`}>
                  PARTNERS
                </span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">1X</span>
            </div>
          )}
          
          {sidebarOpen && (
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <Icon name="fas fa-times" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex-1 overflow-y-auto py-6 ${sidebarOpen ? 'px-3' : 'px-2'}`}>
          <NavSection title="MAIN MENU" items={navigationItems} />
          <NavSection title="MARKETING" items={marketingItems} />
          <NavSection title="REPORTS" items={reportItems} />
        </nav>

        
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;