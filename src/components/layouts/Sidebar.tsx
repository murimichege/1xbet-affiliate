import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavigationItem } from '@/types/common';
import { Button, Icon } from '../ui';

interface SidebarProps {
  navigationItems: NavigationItem[];
  marketingItems: NavigationItem[];
  reportItems: NavigationItem[];
  activeTab: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  navigationItems,
  marketingItems,
  reportItems,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const NavSection: React.FC<{
    title: string;
    items: NavigationItem[];
  }> = ({ title, items }) => (
    <div className="mb-6 sm:mb-8">
      {sidebarOpen && (
        <h3 className="px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {items.map((item) => {
          const path = item.id === 'main' ? '/' : `/${item.id}`;
          
          return (
            <NavLink
              key={item.id}
              to={path}
              onClick={() => {
                // Close sidebar on mobile and tablet when clicking navigation items
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={({ isActive }) =>
                `w-full flex items-center px-2 sm:px-3 py-2 sm:py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
              title={!sidebarOpen ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    name={item.icon}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${sidebarOpen ? 'mr-2 sm:mr-3' : 'mx-auto'} transition-colors ${
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
                  {sidebarOpen && (
                    <>
                      <span className="truncate text-sm">{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      )}
                    </>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <div
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-50 bg-white border-gray-200 border-r transform transition-all duration-300 ease-in-out flex flex-col overflow-hidden ${
          sidebarOpen 
            ? 'w-64 sm:w-64 translate-x-0' 
            : 'w-0 lg:w-16 -translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header/Logo Section */}
        <div className="flex items-center h-14 sm:h-16 border-b border-gray-200 flex-shrink-0 px-3 sm:px-4 lg:px-6">
          {sidebarOpen ? (
            // Expanded view - full logo and text
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">1X</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-lg sm:text-xl font-bold text-blue-600 leading-tight">BET</span>
                  <span className="text-xs text-gray-500 -mt-1 leading-tight">PARTNERS</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden flex-shrink-0 p-1.5 sm:p-2"
              >
                <Icon name="fas fa-times" className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          ) : (
            // Collapsed view - just the icon, centered
            <div className="flex items-center justify-center w-full">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs sm:text-sm">1X</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <nav className={`flex-1 overflow-y-auto py-4 sm:py-6 ${sidebarOpen ? 'px-2 sm:px-3' : 'px-1 sm:px-2'}`}>
          <div className="space-y-4 sm:space-y-6">
            <NavSection title="MAIN MENU" items={navigationItems} />
            <NavSection title="MARKETING" items={marketingItems} />
            <NavSection title="REPORTS" items={reportItems} />
          </div>
        </nav>

        {/* Footer Section - Show when expanded */}
        {sidebarOpen && (
          <div className="border-t border-gray-200 p-3 sm:p-4 flex-shrink-0">
            <div className="text-xs text-gray-500 text-center space-y-1">
              <div>v1.0.0</div>
              <div>© 2025 1xBet Partners</div>
            </div>
          </div>
        )}
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